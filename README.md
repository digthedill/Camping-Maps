### Pitch A Tent (working title)

Project utilizes Google Maps Javascript API in a React environment.

## Tech:

- React
- Firebase Auth
- Firebase DB
- CSS Modules
- National Parks Services API
- Cloudinary Image Upload

## About:

Authenticated maps service that allows users to save campsites, their descriptions and images. Once registered, users can view campsites from other users. To inspire users, the map comes preloaded with all National Parks Services' campgrounds (at least all that is listed on their api). This list of preloaded campgrounds does not include state or private sites.

CRUD operations via firebase firestore to maintain a record for users' "favorite" campsites. Image uploader through Cloudinary allows the firestore document to be significantly smaller by storing a url of the image. An edit mode enables users the ability to upload or delete assets and descriptions about the campsite.

Focused on a maintainable codebase for other developers. I tried to separate all the components, libraries, and utilities. This is also why I chose CSS Modules.
