  import multer from "multer";
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploade');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const uploade = multer({ storage: storage });
export default uploade;
 
          




 