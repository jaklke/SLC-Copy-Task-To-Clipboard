// ==UserScript==
// @name        Copy Task To Clipboard
// @namespace   Violentmonkey Scripts
// @match       https://collaboration.dataminer.services/*
// @grant       none
// @version     1.1.1
// @author      JKE, TCR
// @description 28/3/2024, 17:26:21
// ==/UserScript==

(
    function() {
      'use strict';

      // Function to copy text to clipboard
    function copyToClipboard(text) {
    const type = "text/html";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);

      }



   function buttonClickFunction() {
    // Find the input field with id "taskTitle"
    const taskTitleInput = document.getElementById('taskTitle');

    if (taskTitleInput) {
        // Get the current URL
        const currentUrl = window.location.href;

        if (currentUrl) {
            // Extract the number from the URL
            let number = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
            const queryIndex = number.indexOf('?');

            if (queryIndex != -1) {
                number = number.substring(0, queryIndex);
            }

            // Copy the extracted number to the clipboard
            copyToClipboard('<a href="https://collaboration.dataminer.services/task/' + number + '">' + taskTitleInput.value + '</a> (' + number + ')');            
        } else {
            alert('URL could not be identified.');
        }
    } else {
        alert('Input field with id "taskTitle" not found!');
    }
}

      function addButtonToToolbar() {
          //var toolbarButtonGroup = document.querySelector('.toolbar-btn-group');
        var toolbarButtonGroup = document.querySelector('div.toolbar-btn-group');

          if (toolbarButtonGroup && toolbarButtonGroup.querySelector('#PrettyDCPLinkCopy') === null) {
              // Create the button element
              var customButton = document.createElement('button');
            customButton.id = 'PrettyDCPLinkCopy'
            customButton.classList.add("btn","btn-outline-secondary-custom","btn-toolbar-task-details","d-inline-flex","justify-content-center","align-items-center","ng-star-inserted");
            // customButton.style.borderRadius = '50%'; // Makes the button circular
            customButton.style.width = '30px'; // Set the width to desired size
            customButton.style.height = '30px'; // Set the height to desired size
            customButton.style.marginRight = '3px';
            customButton.innerHTML = 'Copy';

            customButton.innerHTML = '<fa-icon _ngcontent-ng-c2024319211="" class="ng-fa-icon"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share" class="svg-inline--fa fa-share fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"></path></svg></fa-icon>';

              customButton.addEventListener('click', buttonClickFunction);

              // Append the button to the toolbar
              //toolbarButtonGroup.appendChild(customButton);

            toolbarButtonGroup.insertBefore(customButton, toolbarButtonGroup.childNodes[1]);
          }
      }

      function observeToolbarVisibility(retry) {
        var toolbar = document.querySelector('div.toolbar-btn-group');
        if (toolbar) {
            addButtonToToolbar();
            return;
        }
        if (retry > 0) {
            setTimeout(observeToolbarVisibility, 250, retry -1);
        }
    }

      document.addEventListener('click', function(event) {
            observeToolbarVisibility(4)
    });



    observeToolbarVisibility(4);


     // window.addEventListener('popstate', function (event) {
      // addButtonToToolbar();
  //});



  })();
