// ==UserScript==
// @name        Copy RN To Clipboard
// @namespace   Violentmonkey Scripts
// @match       https://intranet.skyline.be/DataMiner/Lists/Release%20Notes/DispForm.aspx*
// @grant       none
// @version     1.0
// @author      Thomas Cauwelier
// @description 28/3/2024, 17:26:21
// ==/UserScript==

(
    function () {
        'use strict';

        // Function to copy text to clipboard
        function copyToClipboard(text) {
            const type = "text/html";
            const blob = new Blob([text], {type});
            const data = [new ClipboardItem({[type]: blob})];
            navigator.clipboard.write(data);
        }

        function extractIDFromURL(url) {
            var queryParams = url.split('?')[1]; // Get the query parameters part of the URL
            var params = new URLSearchParams(queryParams);
             // Get the value of the 'ID' parameter
            return params.get('ID');
        }

        function GetTitle() {
            // Find the table rows
            var tableRows = document.querySelectorAll('.ms-formtable tr');

            // Loop through each table row
            for (var i = 0; i < tableRows.length; i++) {
                // Get the current row
                var row = tableRows[i];

                // Find the cell in the current row with the text "Title"
                var titleCell = row.querySelector('.ms-formlabel h3');
                if (titleCell && titleCell.innerText.trim() === 'Title') {
                    // Get the next sibling cell which contains the value
                    var valueCell = row.querySelector('.ms-formbody');

                    // Extract and log the value if valueCell is defined
                    if (valueCell) {
                        return valueCell.innerText.trim();
                    }
                }
            }
        }

        function buttonClickFunction() {
            console.log('clicked');
            var id = extractIDFromURL(window.location.href);
            var title = GetTitle();
            copyToClipboard('RN' + id + ' <a href="' + window.location.href + '">' + title + '</a>');
        }


        function addButton() {
            //var toolbarButtonGroup = document.querySelector('.toolbar-btn-group');
            var suiteBarLeft = document.querySelector('#suiteBarLeft');

            if (suiteBarLeft) {
                // Create the button element
                var customButton = document.createElement('button');
                // customButton.style.borderRadius = '50%'; // Makes the button circular
                customButton.style.width = '30px'; // Set the width to desired size
                customButton.style.height = '30px'; // Set the height to desired size
                customButton.style.marginRight = '3px';
                customButton.style.minWidth = '30px';
                customButton.innerHTML = 'Copy';

                customButton.innerHTML = '<fa-icon _ngcontent-ng-c2024319211="" class="ng-fa-icon"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share" class="svg-inline--fa fa-share fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"></path></svg></fa-icon>';

                customButton.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default form submission behavior
                    buttonClickFunction();
                });

                // Append the button to the toolbar
                //toolbarButtonGroup.appendChild(customButton);

                suiteBarLeft.insertBefore(customButton, suiteBarLeft.childNodes[1]);
            }
        }

        window.addEventListener('load', function () {
            addButton();
        });

    })();
