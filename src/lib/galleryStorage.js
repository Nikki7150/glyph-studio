export function saveToGallery(storageKey, item) {
    const existing = localStorage.getItem(storageKey);
    const gallery = existing ? JSON.parse(existing) : [];
    gallery.push(item);
    localStorage.setItem(storageKey, JSON.stringify(gallery));
}

export function deleteFromGallery(storageKey, itemId) {
    const existing = localStorage.getItem(storageKey);
    const gallery = existing ? JSON.parse(existing) : [];
    const updatedGallery = gallery.filter(item => item.id !== itemId);
    localStorage.setItem(storageKey, JSON.stringify(updatedGallery));
    return updatedGallery;
}