### Typescript && Express && Vue3 fullstack application

to the moon 🚀🚀

### Application functionalities examples:

## 🌎 Home Page

[gif](https://i.imgur.com/GOs3Nxo.mp4) "gif"

1. **Searching bar**
    - You are able to filter offers by:
        - Price (automatically translated into USD)
        - Category
        - Created at date
    - or even search for a certin phrase
2. **Offers displaying with pagination feature**
    - Default up to 12 per page, but can be modified in env.ts file
    - Offers with status different than DEFAULT are automatically excluded
3. **Offers features:**
    - Each offer can be followed by logged user
    - Offers can be deleted by his either his owner or admin
    - Clicking offers image will redirect you to certain offer subpage
    - Clicking offers category label will redirect you to home page with category filter set to clicked category

## 🚀 User profile

[gif](https://i.imgur.com/2M6hxs7.mp4) "gif"

1. **User account management section**
    - Accessable only by profile owner or any admin
    - Place from where account can be deleted or avatar can be changed
2. **Data charts with mode switch(bar/pie)**
3. **Reviews about profile owner with stars summary**
4. **Reviews about others users set setted by profile owner**
5. **Offers list**
    - Profile owner and admins are able to inspect offers and be redirected to a offers management subpage
    - Clicking offers image will redirect you to certain offer subpage

## 🎉Single Offer

[gif](https://i.imgur.com/a61BnaU.mp4) "gif"

1. **Offer status management bar**
    - Is visible only for user authorized as either offer owner or admin
    - Only admins have access to banning offer button
    - Offers with status different than DEFAULT can be accessed only by admins or owners
2. **Gallery support keydown navigation**
    - "+"- will open image modal
    - arrow left/right- move among images
    - esc- close modal
3. **Recommendations at bottom**
    - Recommendations based on category can not include current offer or any other offer from current offer creator

## ✔ Change offer status

[gif](https://i.imgur.com/GX8kwEi.mp4) "gif"

1. **Each offer has DEFAULT status by default**
2. **Status is type ENUM("DEFAULT","BANNED","HIDDEN","SOLD")**
3. **The only difference so far between HIDDEN and SOLD is label color**
    - There is nice place for further logic expansion, we're able to compare amount of sold, hidden, baned and active offer at different charts
4. **BANNED status can be setted only by admin**

## ⚙ Offers management

[gif](https://i.imgur.com/GX8kwEi.mp4) "gif"

## 🛠 Login and Register

[gif](https://i.imgur.com/xiLUhkG.mp4) "gif"

## ⚡ Offers following

[gif](https://i.imgur.com/pHdMK6U.mp4) "gif"

still to the moon 🚀🚀
