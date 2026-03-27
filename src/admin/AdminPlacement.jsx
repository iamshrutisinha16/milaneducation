import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPlacement = () => {

const [data,setData] = useState({

heroTitle:"",
heroHighlight:"",
heroDescription:"",
heroImage:"",

aboutTitle:"",
aboutDescription:"",
aboutImage:"",

features:[],
recruiters:[],
highlights:[],

ctaTitle:"",
ctaDescription:"",
ctaButton:""

})


// fetch data

useEffect(()=>{ axios.get("https://collegemilan-backend-2.onrender.com/api/admin/placement")
.then(res=>{
if(res.data.data){
setData(res.data.data)
}
})

},[])



// input change

const handleChange=(e)=>{

setData({
...data,
[e.target.name]:e.target.value
})

}

const handleHeroImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(
      "https://collegemilan-backend-2.onrender.com/api/admin/upload",
      formData
    );

    const imageUrl = res.data.imageUrl;

    setData({
      ...data,
      heroImage: imageUrl
    });

  } catch (err) {
    console.log("Upload error:", err);
  }
};

// feature change

const featureChange=(index,field,value)=>{

const updated=[...data.features]

updated[index][field]=value

setData({...data,features:updated})

}



// add feature

const addFeature=()=>{

setData({
...data,
features:[
...data.features,
{icon:"",title:"",description:""}
]
})

}



// delete feature

const deleteFeature=(index)=>{

const updated=data.features.filter((_,i)=>i!==index)

setData({...data,features:updated})

}



// recruiter change

const recruiterChange=(index,field,value)=>{

const updated=[...data.recruiters]

updated[index][field]=value

setData({...data,recruiters:updated})

}



const addRecruiter=()=>{

setData({
...data,
recruiters:[
...data.recruiters,
{name:"",logo:""}
]
})

}



const deleteRecruiter=(index)=>{

const updated=data.recruiters.filter((_,i)=>i!==index)

setData({...data,recruiters:updated})

}



// highlights

const highlightChange=(index,field,value)=>{

const updated=[...data.highlights]

updated[index][field]=value

setData({...data,highlights:updated})

}



const addHighlight=()=>{

setData({
...data,
highlights:[
...data.highlights,
{icon:"",title:"",description:""}
]
})

}



const deleteHighlight=(index)=>{

const updated=data.highlights.filter((_,i)=>i!==index)

setData({...data,highlights:updated})

}



// save

const saveData=()=>{

axios.put("https://collegemilan-backend-2.onrender.com/api/admin/placement",data)

alert("Placement Updated")

}



return(

<div className="container mt-4">

<h2>Placement Page Admin</h2>

{/* HERO */}

<h4 className="mt-4">Hero Section</h4>

<input
className="form-control mb-2"
placeholder="Hero Title"
name="heroTitle"
value={data.heroTitle}
onChange={handleChange}
/>

<input
className="form-control mb-2"
placeholder="Hero Highlight"
name="heroHighlight"
value={data.heroHighlight}
onChange={handleChange}
/>

<textarea
className="form-control mb-2"
placeholder="Hero Description"
name="heroDescription"
value={data.heroDescription}
onChange={handleChange}
/>

<Form.Group className="mb-3">
  <Form.Label>Upload Hero Image</Form.Label>

  <Form.Control
    type="file"
    accept="image/*"
    onChange={handleHeroImageUpload}
  />

  {data.heroImage && (
    <img
      src={data.heroImage}
      alt="preview"
      style={{
        width: "150px",
        height: "150px",
        objectFit: "cover",
        marginTop: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd"
      }}
    />
  )}
</Form.Group>

{/* ABOUT */}

<h4>About Section</h4>

<input
className="form-control mb-2"
placeholder="About Title"
name="aboutTitle"
value={data.aboutTitle}
onChange={handleChange}
/>

<textarea
className="form-control mb-2"
placeholder="About Description"
name="aboutDescription"
value={data.aboutDescription}
onChange={handleChange}
/>

<input
className="form-control mb-3"
placeholder="About Image Filename"
name="aboutImage"
value={data.aboutImage}
onChange={handleChange}
/>



{/* FEATURES */}

<h4>Features</h4>

{data.features.map((item,index)=>(

<div key={index} className="border p-3 mb-2">

<input
className="form-control mb-1"
placeholder="Icon (FaRocket)"
value={item.icon}
onChange={(e)=>featureChange(index,"icon",e.target.value)}
/>

<input
className="form-control mb-1"
placeholder="Title"
value={item.title}
onChange={(e)=>featureChange(index,"title",e.target.value)}
/>

<input
className="form-control mb-2"
placeholder="Description"
value={item.description}
onChange={(e)=>featureChange(index,"description",e.target.value)}
/>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteFeature(index)}
>
Delete
</button>

</div>

))}

<button
className="btn btn-primary mb-4"
onClick={addFeature}
>
Add Feature
</button>



{/* RECRUITERS */}

<h4>Recruiters</h4>

{data.recruiters.map((item,index)=>(

<div key={index} className="border p-3 mb-2">

<input
className="form-control mb-1"
placeholder="Company Name"
value={item.name}
onChange={(e)=>recruiterChange(index,"name",e.target.value)}
/>

<input
className="form-control mb-2"
placeholder="Logo Filename"
value={item.logo}
onChange={(e)=>recruiterChange(index,"logo",e.target.value)}
/>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteRecruiter(index)}
>
Delete
</button>

</div>

))}

<button
className="btn btn-primary mb-4"
onClick={addRecruiter}
>
Add Recruiter
</button>



{/* HIGHLIGHTS */}

<h4>Highlights</h4>

{data.highlights.map((item,index)=>(

<div key={index} className="border p-3 mb-2">

<input
className="form-control mb-1"
placeholder="Icon"
value={item.icon}
onChange={(e)=>highlightChange(index,"icon",e.target.value)}
/>

<input
className="form-control mb-1"
placeholder="Title"
value={item.title}
onChange={(e)=>highlightChange(index,"title",e.target.value)}
/>

<input
className="form-control mb-2"
placeholder="Description"
value={item.description}
onChange={(e)=>highlightChange(index,"description",e.target.value)}
/>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteHighlight(index)}
>
Delete
</button>

</div>

))}

<button
className="btn btn-primary mb-4"
onClick={addHighlight}
>
Add Highlight
</button>



{/* CTA */}

<h4>CTA</h4>

<input
className="form-control mb-2"
placeholder="CTA Title"
name="ctaTitle"
value={data.ctaTitle}
onChange={handleChange}
/>

<input
className="form-control mb-2"
placeholder="CTA Description"
name="ctaDescription"
value={data.ctaDescription}
onChange={handleChange}
/>

<input
className="form-control mb-4"
placeholder="CTA Button Text"
name="ctaButton"
value={data.ctaButton}
onChange={handleChange}
/>



<button
className="btn btn-success"
onClick={saveData}
>
Save Placement Page
</button>

</div>

)

}

export default AdminPlacement