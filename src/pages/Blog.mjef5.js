import wixData from 'wix-data';

$w.onReady(function () {
    _setupCategoryFilter();
    _setupPagination();
});

/**
 * Wire up category filter buttons to the blog posts dataset.
 * The page is expected to have a #blogPostsDataset connected to a repeater.
 */
function _setupCategoryFilter() {
    if (!_exists('#categoryRepeater')) return;

    $w('#categoryRepeater').onItemReady(($item, itemData) => {
        try {
            $item('#categoryButton').onClick(() => {
                if (!_exists('#blogPostsDataset')) return;
                if (!itemData.slug || itemData.slug === 'all') {
                    $w('#blogPostsDataset').setFilter(wixData.filter());
                } else {
                    $w('#blogPostsDataset').setFilter(
                        wixData.filter().hasSome('categories', [itemData.slug])
                    );
                }
                $w('#blogPostsDataset').loadPage(1);
            });
        } catch (_e) {}
    });
}

/**
 * Wire up previous/next pagination buttons for the blog dataset.
 */
function _setupPagination() {
    if (!_exists('#blogPostsDataset')) return;

    if (_exists('#nextPageButton')) {
        $w('#nextPageButton').onClick(() => {
            $w('#blogPostsDataset').nextPage()
                .then(() => _updatePaginationButtons())
                .catch(() => {});
        });
    }

    if (_exists('#prevPageButton')) {
        $w('#prevPageButton').onClick(() => {
            $w('#blogPostsDataset').previousPage()
                .then(() => _updatePaginationButtons())
                .catch(() => {});
        });
    }

    $w('#blogPostsDataset').onReady(() => _updatePaginationButtons());
}

/**
 * Enable/disable pagination buttons based on dataset page state.
 */
function _updatePaginationButtons() {
    if (!_exists('#blogPostsDataset')) return;
    const ds = $w('#blogPostsDataset');
    if (_exists('#prevPageButton')) {
        ds.hasPrevPage() ? $w('#prevPageButton').enable() : $w('#prevPageButton').disable();
    }
    if (_exists('#nextPageButton')) {
        ds.hasNextPage() ? $w('#nextPageButton').enable() : $w('#nextPageButton').disable();
    }
}

/**
 * Returns true if an element with the given selector exists on the current page.
 */
function _exists(selector) {
    try { return Boolean($w(selector).type); } catch (_e) { return false; }
}
