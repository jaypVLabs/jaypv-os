import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    _setupShareButtons();
    _displayReadTime();
});

/**
 * Wire up share buttons to open platform-specific share URLs.
 */
function _setupShareButtons() {
    const pageUrl = encodeURIComponent(wixLocation.url);
    const pageTitle = encodeURIComponent(
        _exists('#postTitle') ? $w('#postTitle').text : document.title || ''
    );

    if (_exists('#shareTwitterButton')) {
        $w('#shareTwitterButton').link = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
        $w('#shareTwitterButton').target = '_blank';
    }

    if (_exists('#shareFacebookButton')) {
        $w('#shareFacebookButton').link = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
        $w('#shareFacebookButton').target = '_blank';
    }

    if (_exists('#shareLinkedinButton')) {
        $w('#shareLinkedinButton').link =
            `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
        $w('#shareLinkedinButton').target = '_blank';
    }

    if (_exists('#copyLinkButton')) {
        $w('#copyLinkButton').onClick(() => {
            wixWindow.copyToClipboard(wixLocation.url)
                .then(() => {
                    $w('#copyLinkButton').label = 'Copied!';
                    setTimeout(() => { $w('#copyLinkButton').label = 'Copy Link'; }, 2000);
                })
                .catch(() => {});
        });
    }
}

/**
 * Estimate and display reading time based on the post body word count.
 * Assumes ~200 words per minute reading speed.
 */
function _displayReadTime() {
    if (!_exists('#postBody') || !_exists('#readTimeText')) return;

    const text = $w('#postBody').text || '';
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    $w('#readTimeText').text = `${minutes} min read`;
}

/**
 * Returns true if an element with the given selector exists on the current page.
 */
function _exists(selector) {
    try { return Boolean($w(selector).type); } catch (_e) { return false; }
}
