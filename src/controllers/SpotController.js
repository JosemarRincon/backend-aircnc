const Spot = require('../models/Spot');
const User = require('../models/User');
module.exports = {

  async index(req, res){
    const {tech}= req.query;
    
    let filter = {techs: tech}
    //console.log(tech)
    if(!tech || tech == ''){
      filter ={ techs: {$nin:null} }
      //console.log(filter)
    }
    let spots = await Spot.find(filter);
    
    return res.json(spots);
  },
  async store(req, res) {
    const {filename} = req.file;
    const { company, techs, price} = req.body;
    const {user_id} = req.headers;

    const user = await User.findById(user_id);
    console.log(user)


    if(!user){
      return res.status(400).json({error: 'User does not exists!'});
    }

    const spot = await Spot.create({
      user:user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price
    })
   
    return res.json(spot);
  }

}