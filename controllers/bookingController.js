import Ride from '../models/Ride.js';


//create new Ride
export const createRide = async(req,res)=>{
    const newRide = new Ride(req.body);
    try{
      const savedRide = await newRide.save();

      res.status(200).json({success:true, message:'Your Ride is booked', data:savedRide});
    } catch(err){
      res.status(500).json({success:true, message:'Internal server error'});

    }
};

//get single Ride
export const getRide = async(req,res)=>{
    const id = req.params.id;

    try{
      const book = await Ride.findById(id);
      
      res.status(200).json({success:true, message:'successful', data:book});

    } catch (err) {
      res.status(404).json({success:true, message:'not found' });

    }
};

//get all Ride
export const getAllRide = async(req,res)=>{

    try{
      const books = await Ride.find();
      
      res.status(200).json({success:true, message:'successful', data:books});

    } catch (err) {
      res.status(500).json({success:true, message:'internal server error' });

    }
};