export { default as roleHelper } from './role'
export { default as imageHelper } from './image'
export { default as bookingHelper } from './booking'
export { default as storageHelper } from './storage'
export { default as packageHelper } from './package'
export { default as priceHelper } from './price'
export { default as seoHelper } from './seo'
export { default as avatarHelper } from './avatar'
export function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
}
