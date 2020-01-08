
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
        var title = tabs[0].title;

        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://small-drive.herokuapp.com/save?link=' + url + '&title=' + title);

        xhr.responseType = 'json';

        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert('Saved');
            }
        };
    });
});


