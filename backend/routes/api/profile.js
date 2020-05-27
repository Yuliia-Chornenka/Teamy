const router = require("express").Router();
const User = require("../../models/User");
const upload = require('../middleware/file-upload');
const auth = require('../middleware/verify');
const multer = require('multer');


router.get('/profile', auth, async (req, res) => {
  try {
    await res.json(req.user);
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong. Try again later.',
      error: e,
    });
  }
});

/*  Change avatar  */
// router.patch('/profile', auth, upload.array('image', 1), (req, res, err) => {
//
//   const imgUrl = `https://teamy.s3.amazonaws.com/${req.file}`;
//
//   try {
//         User.findByIdAndUpdate(req.user._id,
//           {photo: imgUrl}, {new: true}, (error) => {
//             if (error) {
//               return res.status(500).json({message: 'Failed to update'});
//             }
//           });
//     res.send({ image: imgUrl });
//   } catch (e) {
//     res.status(500).json({
//       message: 'Something went wrong. Try again later',
//       error: e,
//     });
//   }
// });



/*  Change avatar  */
router.patch('/profile', auth, async (req, res) => {

  try {
    await upload(req, res, function(err) {
      console.log(req);
      const imgUrl = `https://teamy.s3.amazonaws.com/${req.file}`;


      if (err instanceof multer.MulterError) {
        res.status(413).json('File size must not exceed 1 megabyte');
      } else {
        User.findByIdAndUpdate(req.user._id,
          {photo: imgUrl}, {new: true}, (error) => {
            if (error) {
              return res.status(500).json({message: 'Failed to update'});
            }
          });
        res.send({ image: imgUrl });
      }
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong. Try again later',
      error: e,
    });
  }
});


module.exports = router;
