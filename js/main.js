var pdfLib = pdfLib || {};

(function ($) {

    "use strict";
    $(function () {
        pdfLib = {


            formFields: [],

            init: function () {
                this.fileSelector$ = $("#file-selector");
                this.setEvents();
            },

            setEvents: function() {
                const _that = this;
                this.fileSelector$.change(function(e) {
                    _that.onFileSelected(e)
                });
            },

            onFileSelected: async function(e) {
                const _that = this;
                const fileList = e.target.files;
                if (fileList?.length > 0) {
                    console.log('FileList ', fileList);
                 //   const pdfArrayBuffer = await _that.readFileAsync(fileList[0]);
                    const pdfArrayBuffer = await pdfLib.readFileAsync(fileList[0]);
                    const pdfDoc = await PDFLib.PDFDocument.load(pdfArrayBuffer);
                    const form = pdfDoc.getForm()
                    const fields = form.getFields();
                    this.getFormField(fields);
                    console.log('PDF Form Fields ', fields);
                }
            },

            readFileAsync: function (file) {
                return new Promise((resolve, reject) => {
                  let reader = new FileReader();
                  reader.onload = () => {
                    resolve(reader.result);
                  };
                  reader.onerror = reject;
                  reader.readAsArrayBuffer(file);
                });
            },

            getFormField: function (fields) {
                if (fields && fields.length > 0) {
                    fields.forEach(function (field) {
                        console.log(field)
                    })
                }
            }


        };

        pdfLib.init();
    });
})(jQuery);


