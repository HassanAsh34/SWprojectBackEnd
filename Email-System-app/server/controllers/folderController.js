const User = require("../models/User");
const folders = require("../Schemas/folderSchema.js");
const emails = require("../Schemas/emailSchema.js");



exports.createFolder = async (req, res) => {
    try{
    if(req.body.name.length <= 2){
        return res.status(500).json({msg:"name must be greater than 2 letter"});
    }
    const user = new User(); 
    let name = req.body.name.toLowerCase() 
    const result = await folders.find({name:name,userEmail:req.user.email})
    if(result.length === 0 ){
        // console.log(req.user);
        user.createFolder(req.body.name,req.user.email);
        return res.status(200).json({msg:"folder created"});
        
    }
    else
        return res.status(500).json({msg:"folder already exist"});
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
    };
exports.deleteFolder = async (req, res) => {
    // console.log(req.params.Fname)
    try{
    const user = new User();
    let name = req.params.Fname.toLowerCase() 
    // const result = await folders.findOne({_id:req.params.folderId})
    const result = await folders.findOne({name:name,userEmail:req.user.email})
    // result.
    // console.log(result)
    // console.log(result.isCustom)
    if(result != null){
        if(result.isCustom == true)
        {
            // console.log()
            user.deleteFolder(result.id);
            return res.status(200).json({msg:"folder is deleted"});
        }
        else
            return res.status(500).json({msg:"this folder cannot be deleted"});  
    }
    else
        return res.status(500).json({msg:"folder is not exist"});
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
        
    
    };
exports.renameFolder = async (req, res) => {
    try{
    const user = new User();
    let Cname = req.params.Fname.toLowerCase() 
    let Nname = req.body.name.toLowerCase()
    // const result = await folders.findOne({_id:req.params.folderId})
    if(Nname.length <= 2){
        return res.status(500).json({msg:"the folder name must be more than 2 characters"});
    }
    const result = await folders.findOne({name:Nname,userEmail:req.user.email})
    // const result = await folders.findOne({userEmail:req.user.email,name:req.body.name})
    // console.log(result)
    if(result === null){
        
        // console.log(1)
        let CurrentFolder = await folders.findOne({name:Cname,userEmail:req.user.email},{isCustom:1})
        if(CurrentFolder.isCustom == true)
            {
                user.renameFolder(CurrentFolder.id,Nname);
                return res.status(200).json({msg:"folder is updated"});
            }
            else
                return res.status(500).json({msg:"this folder cannot be renamed"});  
    }
    else 
        res.status(500).json({msg:"there is another folder named with that names"});
    }catch(e){
        res.status(500).json({ error: e.message });
    }
    };

exports.moveToSpam = async (req, res) => {
    try{
    const user = new User();

    const result = await emails.find({_id:req.params.emailId});
    if(result.length === 0){
        return res.status(400).json({ msg: "email not found" });
    }
    user.moveToSpam(req.user.email,req.params.emailId,req.params.folderName);
        return res.status(200).json({msg:"done"});
    
    }catch(e){
        return res.status(500).json({ error: e.message });
    }
    };
exports.moveToFolder = async (req, res) => {
    try{
        // /:Fname1/:emailId/:Fname2
    const user = new User();
    const email = await emails.findOne({_id:req.params.emailId});
        // console.log(email)
    Fname1 = req.params.Fname1.toLowerCase()
    Fname2 = req.params.Fname2.toLowerCase()
    // console.log(`controller\nfname1:${Fname1}\nfname2:${Fname2}`)
    if(email == null){
        return res.status(400).json({ msg: "email not found" });
    }
    else
    {
        await user.moveToFolder(req.user.email,email.id,Fname1,Fname2);
        return res.status(200).json({msg:"done"});
    }
    
    }catch(e){
        return res.status(500).json({ error: e.message });
    }   
    };
exports.moveToRecycleBin = async (req, res) => {
    try{
    const user = new User();

    const result = await emails.find({_id:req.params.emailId});
    if(result.length === 0){
        return res.status(400).json({ msg: "email not found" });
    }
    user.moveToRecycle(req.user.email,req.params.emailId,req.params.folderId);
        return res.status(200).json({msg:"done"});
    
    }catch(e){
        return res.status(500).json({ error: e.message });
    } 
};

exports.RecoverFromRecycleBin = async (req,res) =>{
    try {
        const user = new User();
        const result = await emails.find({_id:req.params.emailId});
        if(result.sender == req.user.email)
        {
            user.RecoverEmail(req.user.email,req.params.emailId,"send")
        }
        else
            user.RecoverEmail(req.user.email,req.params.emailId,"inbox")
        return res.status(200).json({msg : "recovered"})

    } catch (error) {
        res.status(500).json({msg: `something went wrong \n ${error.message}`})
    }
}
exports.RecoverEmail = async (req,res) =>{
    try {
        const user = new User();
        const result = await emails.find({_id:req.params.emailId});
        Fname1 = req.params.Fname.toLowerCase()
        if(result.sender == req.user.email)
        {
            user.RecoverEmail2(req.user.email,req.params.emailId,"send",Fname1)
        }
        else
            user.RecoverEmail2(req.user.email,req.params.emailId,"inbox",Fname1)
        return res.status(200).json({msg : "recovered"})

    } catch (error) {
        res.status(500).json({msg: `something went wrong \n ${error.message}`})
    }
}

exports.searchEmails = async (req, res) => {
    try{
    const user = new User();
    
    const result = await user.search(req.body.searchName);
    res.status(200).json({data:result});
    
    }catch(e){
        res.status(500).json({ error: e.message });
    }
};

exports.getFolder = async(req,res,next)=>{
    try {
        let user = req.user
        // console.log(req.params)
        let Fname = req.params.Fname.toLowerCase()
        req.Fname = Fname 
        req.EID = await folders.findOne({name:Fname,userEmail:user.email},{emailsArray:1,_id:0})
        if(req.EID == null)
            return res.status(404).json({msg:"folder not found"})
        // console.log(req.EID)
        next()
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}