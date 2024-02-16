const path = require('path');
const multer = require('multer');
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '../public/Docs');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
// const videoupload = multer({ storage: storage })

// // const videoupload = multer({
// //     storage: storage,
// //     fileFilter: function (req, file, callback) {
// //         // const allowedMimeTypes = ['video/mp4', 'video/quicktime']; 
// //         // if (allowedMimeTypes.includes(file.mimetype)) {
// //         //     callback(null, true);
// //         // } else {
// //         //     console.log('Only MP4 and QuickTime videos are supported');
// //         //     callback(null, false);
// //         // }
// //         var ext = path.extname(file.originalname)
// //         if (ext !== ".mkv" && ext !== ".mp4") {
// //             return cb(new Error("Only videos are allowed"))
// //         }
// //         cb(null, true)
// //     },
// //     // limits: {
// //     //     fileSize: 1024 * 1024 * 50,
// //     // },
// // });

// module.exports = videoupload;


//new one


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         fs.mkdir('public', { recursive: true }, (err) => {
//             if (err) {
//                 return cb(err, 'public/Docs');
//             }

//             fs.mkdir('public/Docs', { recursive: true }, (err) => {
//                 if (err) {
//                     return cb(err);
//                 }
//                 const filePath = 'public/Docs/' + Date.now() + file.originalname;
//                 console.log('File path to be saved:', filePath);
//                 cb(null, filePath);
//             });
//         });
//     },
//     filename: function (req, file, cb) {
//         // cb(null, Date.now() + file.originalname);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })
const uploads = multer({
    storage: storage,
    // fileFilter: function (req, file, cb) {
    //     var ext = path.extname(file.originalname)
    //     if (ext !== ".mkv" && ext !== ".mp4") {
    //         return cb(new Error("Only videos are allowed"))
    //     }
    //     cb(null, true)
    // }
})

module.exports = uploads