import $ from 'jquery';
import env from '../core/env';
import key from '../core/key';
import remoteUI from '../../../../miniAppApi/remoteUI';
import RemoteImageInput from "../../../../miniAppApi/components/RemoteImageInput";
import React from 'react';
import { createRoot } from 'react-dom/client';

export default class ImageDialog {
  constructor(context) {
    this.context = context;
    this.ui = $.summernote.ui;
    this.$body = $(document.body);
    this.$editor = context.layoutInfo.editor;
    this.options = context.options;
    this.lang = this.options.langInfo;
    this.reactRoot = null;      // for remoteImageInput
  }

  initialize() {
    let imageLimitation = '';
    if (this.options.maximumImageFileSize) {
      const unit = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024));
      const readableSize = (this.options.maximumImageFileSize / Math.pow(1024, unit)).toFixed(2) * 1 +
                         ' ' + ' KMGTP'[unit] + 'B';
      imageLimitation = `<small>${this.lang.image.maximumFileSize + ' : ' + readableSize}</small>`;
    }

    const $container = this.options.dialogsInBody ? this.$body : this.options.container;
    const body = [
      '<div class="form-group note-form-group note-group-select-from-files">',
        '<label style="display:inline;" for="note-dialog-image-file-' + this.options.id + '" class="note-form-label">' + this.lang.image.selectFromFiles
        + '</label><div style="display: inline; float:right; margin-left: 10px;" id="react-custom-button-root-' + this.options.id + '"></div>',   //remoteUI.renderScribblyChatButton(),
        '<input id="note-dialog-image-file-' + this.options.id + '" class="note-image-input form-control-file note-form-control note-input" ',
        ' type="file" name="files" accept="'+this.options.acceptImageFileTypes+'" multiple="multiple"/>',
        imageLimitation,
      '</div>',
      '<div class="form-group note-group-image-url">',
        '<label for="note-dialog-image-url-' + this.options.id + '" class="note-form-label">' + this.lang.image.url + '</label>',
        '<input id="note-dialog-image-url-' + this.options.id + '" class="note-image-url form-control note-form-control note-input" type="text"/>',
      '</div>',
    ].join('');
    const buttonClass = 'btn btn-primary note-btn note-btn-primary note-image-btn';
    const footer = `<input type="button" href="#" class="${buttonClass}" value="${this.lang.image.insert}" disabled>`;

    this.$dialog = this.ui.dialog({
      title: this.lang.image.insert,
      fade: this.options.dialogsFade,
      body: body,
      footer: footer,
    }).render().appendTo($container);
  }

  destroy() {
    this.ui.hideDialog(this.$dialog);
    this.$dialog.remove();
  }

  bindEnterKey($input, $btn) {
    $input.on('keypress', (event) => {
      if (event.keyCode === key.code.ENTER) {
        event.preventDefault();
        $btn.trigger('click');
      }
    });
  }

  show() {
    this.context.invoke('editor.saveRange');
    this.showImageDialog().then((data) => {
      // [workaround] hide dialog before restore range for IE range focus
      this.ui.hideDialog(this.$dialog);
      this.context.invoke('editor.restoreRange');

      if (typeof data === 'string') { // image url
        // If onImageLinkInsert set,
        if (this.options.callbacks.onImageLinkInsert) {
          this.context.triggerEvent('image.link.insert', data);
        } else {
          this.context.invoke('editor.insertImage', data);
        }
      } else { // array of files
        this.context.invoke('editor.insertImagesOrCallback', data);
      }
    }).fail(() => {
      this.context.invoke('editor.restoreRange');
    });
  }

  /**
   * show image dialog
   *
   * @param {jQuery} $dialog
   * @return {Promise}
   */
  showImageDialog() {
    return $.Deferred((deferred) => {
      const $imageInput = this.$dialog.find('.note-image-input');
      const $imageUrl = this.$dialog.find('.note-image-url');
      const $imageBtn = this.$dialog.find('.note-image-btn');

      this.ui.onDialogShown(this.$dialog, () => {
        this.context.triggerEvent('dialog.shown');

        //show RemoteImageInput react component
        const reactRootElement = document.getElementById('react-custom-button-root-' + this.options.id);
        if (reactRootElement){
          this.reactRoot = createRoot(reactRootElement);

          const handleImageInsert = (index, imageUrl) => {
            deferred.resolve(imageUrl);
          };

          // now you render using the import modules
          this.reactRoot.render(<RemoteImageInput handleFileUpload={handleImageInsert} index={0} fromApp={"editor"}/>);
        }

        // Cloning imageInput to clear element.
        $imageInput.replaceWith($imageInput.clone().on('change', (event) => {
          deferred.resolve(event.target.files || event.target.value);
        }).val(''));

        $imageUrl.on('input paste propertychange', () => {
          this.ui.toggleBtn($imageBtn, $imageUrl.val());
        }).val('');

        if (!env.isSupportTouch) {
          $imageUrl.trigger('focus');
        }

        $imageBtn.on('click', (event) => {
          event.preventDefault();
          deferred.resolve($imageUrl.val());
        });

        this.bindEnterKey($imageUrl, $imageBtn);
      });

      this.ui.onDialogHidden(this.$dialog, () => {
        //Unmount RemoteImageInput
        if (this.reactRoot){
            this.reactRoot.unmount();
            this.reactRoot = null;
        }

        $imageInput.off();
        $imageUrl.off();
        $imageBtn.off();

        if (deferred.state() === 'pending') {
          deferred.reject();
        }
      });

      this.ui.showDialog(this.$dialog);
    });
  }
}
