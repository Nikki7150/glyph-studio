# Glyph Studio - the ascii experience

## Description
I have recently been getting into ascii art and appreciating how it looks. I think it is a really cool art form and i wanted to learn how to create my own so I thought I should make an app that converts the pictures for me but also allows me to customize its settings. Thats how this app came to life. I first started with learning the math behind converting pixels to ascii charascters. i used that to create the first screen Playground. From there, I had the idea to make the app more of a learning experience and to do so, I had to know what each characters brightness and type was. So i used more math to create the character explorer. As I went along, I had the iea to make a live camera to ascii converter because i thought that would be soo cool. I also added a draeing mode where people could choose characters and create their own ascii art. 
Since I wanted this to be a learning experience, I wanted to show people how each character corresponds to the pixel in the picture, and thus i created the compare mode. And in the end, I added a gallery to save all the artwork to make this app feel more personal and like a place to learn and store your knowledge. 
I had a lot of fun making this project. I'm very proud of it because it had a lot of math to learn and it was a new learning experience for me. I did use claude ai to figure out and learn the math but all the code for everything else was written by me.I hope you have as much fun learning ascii as i had creating it. <3

## Features
- Playground
    - Upload image to turn into Ascii art
    - change width
    - change contrast
    - change brightness
    - make inverted
    - change character set for ascii converter
    - save artwork to Gallery
    - download ascii artwork
    - copy ascii artwork to clipboard
- Character Explorer
    - Click on different characters to see their characteristics
    - learn about the character's category and coverage
    - find the nearest neighbor to the character
    - filter according to character tags and category tags
- Drawing Mode
    - draw on canvas using different characters
    - erase characters
    - clear the entire drawing / grid
    - save artwork to Gallery
    - download ascii artwork
    - copy ascii artwork to clipboard
- Live Camera
    - use live camera to see you and your surroundings in ascii form
    - change contrast
    - change brightness
    - make inverted
    - change character set for ascii converter
    - click picture of live ascii
    - retake picture
    - save ascii photo to Gallery
    - download ascii artwork
    - copy ascii artwork to clipboard
- Compare Mode
    - use alredy uploaded picture from playground to compare ascii and pixels
    - upload a new picture to compare
    - click on an ascii character to see the corresponding pixel on the picture
    - also see what the character you clicked is, its row and column and its individual brightness
    - click on the picture to change the following
    - change width
    - change contrast
    - change brightness
    - make inverted
    - change character set for ascii converter
    - save artwork to Gallery
    - download ascii artwork
    - copy ascii artwork to clipboard
- Gallery
    - see all artworks saved from playground
    - see all artworks saved from live camera
    - see all artworks saved from drawing mode
    - click on artwork thumbnail to open a larger preview
    - see all the settings of the artwork
    - delete artwork from gallery
    - download ascii artwork
    - copy ascii artwork to clipboard

## Technologies Used
- React (.jsx)
- Vite
- HTML
- CSS
- JavaScript
- Local Storage
- Zustand - states

## Limitations
- You can only paste the copied artwork in a text editor like NotePad or VSCode
- you can only filter according to one tag
- cannot update / change filters on already saved projects through gallery

## Future plans
- add filtering according to multiple tags
- pull gallery artwork into playground to change settings
- add login with username
- add leaderboards and learning lessons to create code for ascii converter
