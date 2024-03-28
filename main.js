// ==UserScript==
// @name        Copy Task To Clipboard
// @namespace   Violentmonkey Scripts
// @match       https://collaboration.dataminer.services/*
// @grant       none
// @version     1.0
// @author      Jan-Klaas Kesteloot
// @description 25/3/2024, 20:57:40
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
          // Execute your desired function here
           // Find the <a> tag under the div with id "dropdownMenMoreOptions"
              const taskTitleInput = document.getElementById('taskTitle');
              if(taskTitleInput) {
              const dropdownMenu = document.getElementById('dropdownMenMoreOptions');
              if (dropdownMenu) {
                  const link = dropdownMenu.querySelector('a');
                  if (link) {
                      // Extract the number from the URL
                      const url = link.getAttribute('href');
                      const number = url.match(/\d+$/);
                      if (number) {
                          // Copy the extracted number to clipboard
                          copyToClipboard('<a href="https://collaboration.dataminer.services/task/' + number[0] + '">' + taskTitleInput.value + '</a> (' + number[0] + ')');
                          //alert('Number copied to clipboard!');
                      } else {
                          alert('Number not found in URL!');
                      }
                  } else {
                      alert('Anchor tag not found under the dropdown menu!');
                  }
              } else {
                  alert('Dropdown menu with id "dropdownMenMoreOptions" not found!');
              }
          } else {
              alert('Input field with id "taskTitle" not found!');
  
          }
      }
  
      function addButtonToToolbar() {
          //var toolbarButtonGroup = document.querySelector('.toolbar-btn-group');
        var toolbarButtonGroup = document.querySelector('#navbarsExampleDefault');
  
          if (toolbarButtonGroup) {
              // Create the button element
              var customButton = document.createElement('button');
            customButton.classList.add("btn","btn-outline-secondary-custom","btn-toolbar-task-details","d-inline-flex","justify-content-center","align-items-center","ng-star-inserted");
            customButton.innerHTML = 'Copy';
  
            customButton.innerHTML = '<fa-icon _ngcontent-ng-c2024319211="" class="ng-fa-icon"><svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share" class="svg-inline--fa fa-share fa-fw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"></path></svg></fa-icon>';
  
              customButton.addEventListener('click', buttonClickFunction);
  
              // Append the button to the toolbar
              //toolbarButtonGroup.appendChild(customButton);
  
            toolbarButtonGroup.insertBefore(customButton, toolbarButtonGroup.childNodes[1]);
  
              // Disconnect the observer once the button is added
             observer.disconnect();
          }
      }
  
       // Create a MutationObserver to watch for changes in the DOM
      var observer = new MutationObserver(addButtonToToolbar);
  
       // Configure the observer to watch for changes in the body subtree
      observer.observe(document.body, { childList: true, subtree: true });
  
        // Initially check if the toolbar is already available
      addButtonToToolbar();
  
  
  
     // window.addEventListener('popstate', function (event) {
      // addButtonToToolbar();
  //});
  
  
  
  })();
  
  
  
  