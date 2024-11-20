import Ride from "../models/Ride.js";
import Review from "../models/Review.js";


export const createReview = async(req,res)=>{
    const RideId = req.params.RideId;
    const newReview = new Review({ ...req.body });

    try{
      const savedReview = await newReview.save();

      await Ride.findByIdAndUpdate(RideId, {
        $push: { reviews: savedReview._id},
      });

      res
        .status(200)
        .json({success: true, message: 'Review submitted', data: savedReview});
    } catch(err){
        res.status(500).json({success: false, message: 'failed to submit'});
    }
};
