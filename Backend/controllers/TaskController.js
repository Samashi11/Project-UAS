import Task from "../models/TaskModel.js";
import path from "path";
import fs from "fs"

export const getTasks = async (req, res) => {
  try {
    const response = await Task.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const getTaskById = async (req, res) => {
  try {
    const response = await Task.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
}


export const createTaskAdmin = async (req, res) => {
  
    const task_title = req.body.title;
    const task_desc = req.body.desc;
    const user = req.body.user_id;
    const time_start = req.body.start;
    const time_end = req.body.end;

    try {
      await Task.create({
        judul_tugas: task_title,
        detail_tugas: task_desc,
        user_id: user,
        waktu_awal: time_start,
        waktu_akhir: time_end,
      }
      );
      res.status(201).json({msg: "Task Created Successfuly"});
    } catch (error) {
      console.log(error.message);
    }

}

export const updateTaskAdmin = async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id // Replace with the actual ID you want to retrieve
    }
  });
  if (!task) return res.status(404).json({ msg: "No Data Found" });
  
  const task_title = req.body.title;
  const task_desc = req.body.desc;
  const user = req.body.user_id;
  const time_start = req.body.start;
  const time_end = req.body.end;

  try {
    await Task.update({
      judul_tugas: task_title,
      detail_tugas: task_desc,
      user_id: user,
      waktu_awal: time_start,
      waktu_akhir: time_end,
    }, {
      where: {
        id: req.params.id
      }
    }
    );
    res.status(201).json({msg: "Task Updated Successfuly"});
  } catch (error) {
    console.log(error.message);
  }

}

export const saveTaskUser = (req, res) => {
  if (req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const task_title = req.body.title;
    const task_desc = req.body.desc;
    const user = req.body.user_id;
    const time = req.body.time;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({msg: "Invalid Images"});

    if (fileSize > 5000000) return res.status(422).json({msg: "Image must less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async (err) => {
      if(err) return res.status(500).json({msg: err.message});

      try {
        await Task.create({
          judul_tugas: task_title,
          detail_tugas: task_desc,
          user_id: user,
          date: time,
          bukti: fileName,
          status_user: 'Selesai'
        }
        );
        res.status(201).json({msg: "Task Created Successfuly"});
      } catch (error) {
        console.log(error.message);
      }
    });

}

export const updateTaskUser = async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!task) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = task.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must less than 5 MB" });

    const filepath = `./public/images/${task.image}`;
    fs.unlinkSync(filepath); // Delete the previous image file if a new one is uploaded

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update({
      bukti: fileName,
      status_user: 'Selesai',
      url: url
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      msg: "Task Updated Successfully",
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!task) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = task.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must less than 5 MB" });

    const filepath = `./public/images/${product.image}`;
    fs.unlinkSync(filepath); // Delete the previous image file if a new one is uploaded

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update({
      name: name,
      image: fileName,
      url: url
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      msg: "Product Updated Successfully",
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id
    }
  });
  if(!task) return res.status(404).json({msg: "No Data Found"});

  try {
    await Task.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg: "task Deleted Successfuly"});
  } catch (error) {
    console.log(error.message);
  }
}
