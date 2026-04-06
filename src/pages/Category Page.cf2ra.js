import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(function () {
    _setupFilters();
    _setupSortDropdown();
    _setupBreadcrumbs();
});

/**
 * Wire up filter buttons to toggle visibility of items in the product gallery.
 * The gallery dataset is expected to have a filterByField method.
 */
function _setupFilters() {
    if (!_exists('#filterRepeater')) return;

    $w('#filterRepeater').onItemReady(($item, itemData) => {
        if (!_exists('#filterButton')) return;
        $item('#filterButton').onClick(() => {
            if (!_exists('#productsDataset')) return;
            if (itemData.value === 'all') {
                $w('#productsDataset').setFilter(wixData.filter());
            } else {
                $w('#productsDataset').setFilter(
                    wixData.filter().eq('category', itemData.value)
                );
            }
        });
    });
}

/**
 * Wire up the sort dropdown to re-order the products dataset.
 */
function _setupSortDropdown() {
    if (!_exists('#sortDropdown') || !_exists('#productsDataset')) return;

    $w('#sortDropdown').onChange((event) => {
        const val = event.target.value;
        if (val === 'price_asc') {
            $w('#productsDataset').setSort(wixData.sort().ascending('price'));
        } else if (val === 'price_desc') {
            $w('#productsDataset').setSort(wixData.sort().descending('price'));
        } else if (val === 'newest') {
            $w('#productsDataset').setSort(wixData.sort().descending('_createdDate'));
        }
    });
}

/**
 * Build breadcrumbs from the current URL path.
 */
function _setupBreadcrumbs() {
    if (!_exists('#breadcrumbText')) return;

    const path = wixLocation.path || [];
    const category = path[path.length - 1] || '';
    const displayName = category
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

    $w('#breadcrumbText').text = `Home > Shop${displayName ? ' > ' + displayName : ''}`;
}

/**
 * Returns true if an element with the given selector exists on the current page.
 */
function _exists(selector) {
    try {
        return Boolean($w(selector).type);
    } catch (_e) {
        return false;
    }
}
