import Ride from "../models/Ride.js"
import User from "../models/User.js"

export const createRide= async(req,res) =>{
    const {id}=req.user
    const user=await User.findOne({_id:id})
    const {email} = user
    console.log(email)
    req.body.ride.driveremail=email
    console.log(req.body.ride.from)
    const newRide=new Ride(req.body.ride)
    console.log(newRide)
    try{
        const saveRide = await newRide.save();
        console.log(saveRide)
        res.status(200).json({success:true,message:"Successfully created",data:saveRide})
    } catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Failed to create,try again"})
    }
}

export const updateRide = async(req,res) =>{
    const {id} = req.query
    console.log(id)
    
    try{
        const updateData=req.body.ride
        const updatedRide = await Ride.findOneAndUpdate({_id:id},updateData,{new:true})
        console.log(updateRide)
        res.status(200).json({success:true,message:"Successfully updated"})
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Failed to update,try again"})
    }
    
}

export const deleteRide = async(req,res) =>{
    const {id}=req.query
    try{
        const deleteRide=await Ride.findByIdAndRemove(id)
        console.log(deleteRide)
        res.status(200).json({success:true,message:"Successfully deleted"})
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Failed to delete,try again"})
    }
}

export const getRide = async(req,res) =>{
    const {from , to, date ,passengers}=req.query
    console.log(from)
    console.log(to)
    console.log(date)
    console.log(passengers)
    const pickup=from.split(",")
    const dropoff=to.split(",")
    try{
        const rides=await Ride.find({from:{$regex:new RegExp(pickup[pickup.length-1])},from:{$regex:new RegExp(pickup[pickup.length-2])},to:{$regex:new RegExp(dropoff[dropoff.length-1])},to:{$regex:new RegExp(dropoff[dropoff.length-2])},date:date,passengers:{$gte:passengers}})
        console.log(rides)
        if(!rides[0]){
            res.status(200).json({success:false,message:"There is no results matched"})
        }
        else{
            console.log("odddd")
            res.status(200).json({success:true,data:rides})
        }
    }catch(err){
        console.log(err)
        res.statue(500).json({success:false,message:"Failed to get rides,try again"})
    }
}

export const getFeaturedRide = async (req, res) => {
    try {
        const rides = await Ride.find({ featured: true }).limit(8);

        res.status(200).json({ success: true, message: 'Successful', data: rides });
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: 'Not found' });
    }
};
   
export const getRideCount = async (req, res) => {
    try {
        const rideCount = await Ride.estimatedDocumentCount();

        res.status(200).json({ success: true, data: rideCount });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Failed to fetch' });
    }
};

export const getAllRides = async (req, res) => {
    console.log('Controlador getAllRides ejecutado');
    try {
      const rides = await Ride.find();
      console.log('Datos encontrados:', rides);
      res.status(200).json(rides);
    } catch (error) {
      console.error('Error en getAllRides:', error.message);
      res.status(500).json({ message: 'Error al obtener los viajes' });
    }
  };
  
  

export const getDriverRides=async(req,res)=>{
    const {id}=req.query
    const user=await User.findById(id)
    const {email} = user
    const rides=await Ride.find({driveremail:email})
    if(!rides[0]){
        res.status(404).json({success:false,message:"There is no results matched"})
    }
    else{
        res.status(200).json({success:true,data:rides})
    }
}