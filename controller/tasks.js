const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getAllTasks = async (req,res) =>{
    try{
        const tasks = await Task.find({});
        res.status(200).json({tasks})
        // res.status(200).json({tasks,amount:tasks.length})
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const createTask = async (req,res) =>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }
    catch (error){
        res.status(500).json({msg:error.message})
    }   
}

const getTask = async (req,res) =>{
    const {id:taskID} = req.params
    try{
        const task = await Task.findOne({_id:taskID})
        if (!task){
            return  res.status(404).json({msg:`No task with id:${taskID}`})
        }

        // for wrong syntax  like id with less or more character
        res.status(200).json({task})

    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}


const updateTask = async (req,res) =>{ 
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({
            _id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if (!task){
            return  res.status(404).json({msg:`No task with id:${taskID}`})
        }

        // for wrong syntax  like id with less or more character
        res.status(200).json({task})
    }
    catch(error){
        res.status(500).json({msg:error.message})
    }
}

const deleteTask = async(req,res) =>{
    try{
        // getting the id value from req by desctructuring and assigning it to TaskID 
        const{id:taskID} = req.params

        const task = await Task.findOneAndDelete({_id:taskID})
        if (!task){
            return  res.status(404).json({msg:`No task with id:${taskID}`})
        }

        res.status(200).json({task})
    }

    catch(error){
        res.status(500).json({msg:error.message})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}