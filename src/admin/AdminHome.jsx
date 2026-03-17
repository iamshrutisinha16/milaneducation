import { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col, Form, Button, Card, Toast, ToastContainer } from "react-bootstrap"
import { FaPlusCircle, FaTrash } from "react-icons/fa"

function HomeAdmin(){

const [data,setData] = useState(null)
const [showToast,setShowToast] = useState(false)
const [isSaving, setIsSaving] = useState(false) // NAYA LOADING STATE

useEffect(()=>{

axios
.get("https://collegemilan-backend-2.onrender.com/api/admin/home")
.then(res=>{

const d = res.data

if(!d.featuresSection || d.featuresSection.length === 0){
d.featuresSection = [
{ title:"Career Map", description:"", link:"/careermap", color:"#f47920" },
{ title:"Psychometric Test", description:"", link:"/test", color:"#2b2d42" },
{ title:"Counseling Session", description:"", link:"/counselling", color:"#866248" },
{ title:"Watch Photos & Videos", description:"", link:"/event&updates", color:"#2b2d42" }
]
}

if(!d.servicesSection || d.servicesSection.length === 0){
d.servicesSection = [
{ title:"", description:"" }
]
}

if(!d.statsSection || d.statsSection.length === 0){
d.statsSection = [
{ number:"", title:"" }
]
}

if(!d.blogSection || d.blogSection.length === 0){
d.blogSection = [
{ title:"", category:"", image:"" }
]
}

setData(d)

})
.catch(err=>console.log(err))

},[])



/* OBJECT CHANGE */

const handleObjectChange = (section,field,value)=>{

setData({
...data,
[section]:{
...(data[section] || {}),
[field]:value
}
})

}



/* ARRAY CHANGE */

const handleArrayChange = (section,index,field,value)=>{

const updated = [...data[section]]

updated[index][field] = value

setData({
...data,
[section]:updated
})

}



/* ADD FEATURE */

const addFeature = ()=>{

setData({
...data,
featuresSection:[
...data.featuresSection,
{ title:"", description:"", link:"", color:"#f47920" }
]
})

}



/* DELETE FEATURE */

const deleteFeature = (index)=>{

const updated = [...data.featuresSection]

updated.splice(index,1)

setData({
...data,
featuresSection:updated
})

}



/* ADD SERVICE */

const addService = ()=>{

setData({
...data,
servicesSection:[
...data.servicesSection,
{ title:"", description:"" }
]
})

}



/* DELETE SERVICE */

const deleteService = (index)=>{

const updated = [...data.servicesSection]

updated.splice(index,1)

setData({
...data,
servicesSection:updated
})

}



/* ADD STAT */

const addStat = ()=>{

setData({
...data,
statsSection:[
...data.statsSection,
{ number:"", title:"" }
]
})

}



/* DELETE STAT */

const deleteStat = (index)=>{

const updated = [...data.statsSection]

updated.splice(index,1)

setData({
...data,
statsSection:updated
})

}



/* ADD BLOG */

const addBlog = ()=>{

setData({
...data,
blogSection:[
...data.blogSection,
{ title:"", category:"", image:"" }
]
})

}



/* DELETE BLOG */

const deleteBlog = (index)=>{

const updated = [...data.blogSection]

updated.splice(index,1)

setData({
...data,
blogSection:updated
})

}



/* UPDATE PAGE */

const updatePage = async ()=>{
setIsSaving(true) // Button disable hoga aur Saving dikhega

try{

await axios.put(
"https://collegemilan-backend-2.onrender.com/api/admin/home",
data
)

setShowToast(true)

}catch(err){

console.log("Save Error:", err)
alert("Update Failed: " + (err.response?.data?.message || err.message)) // Clear Error Dikhayega

} finally {
setIsSaving(false) // Request khatam hone par wapas theek ho jayega
}

}



if(!data) return <p className="text-center mt-5">Loading...</p>



return(

<Container className="mt-4 mb-5">

<Card className="shadow p-4">

<h3 className="mb-4">Homepage Admin Panel</h3>



{/* HERO SECTION */}

<Card className="p-3 mb-4">

<h5>Hero Section</h5>

<Form.Control
className="mb-3"
placeholder="Title"
value={data.heroSection?.title || ""}
onChange={(e)=>handleObjectChange("heroSection","title",e.target.value)}
/>

<Form.Control
className="mb-3"
placeholder="Description"
value={data.heroSection?.description || ""}
onChange={(e)=>handleObjectChange("heroSection","description",e.target.value)}
/>

<Form.Control
className="mb-3"
placeholder="Button Text"
value={data.heroSection?.buttonText || ""}
onChange={(e)=>handleObjectChange("heroSection","buttonText",e.target.value)}
/>

<Form.Control
placeholder="Hero Image URL"
value={data.heroSection?.heroImage || ""}
onChange={(e)=>handleObjectChange("heroSection","heroImage",e.target.value)}
/>

</Card>



{/* FEATURES SECTION */}

<Card className="p-3 mb-4">

<div className="d-flex justify-content-between align-items-center mb-3">

<h5 className="mb-0">Features Section</h5>

<Button
style={{background:"#f47920",border:"none"}}
onClick={addFeature}
>

<FaPlusCircle className="me-2"/>

Add Feature

</Button>

</div>

{data.featuresSection?.map((item,index)=>(

<Card key={index} className="p-3 mb-3">

<Row className="g-3">

<Col md={6}>
<Form.Control
placeholder="Title"
value={item.title}
onChange={(e)=>handleArrayChange("featuresSection",index,"title",e.target.value)}
/>
</Col>

<Col md={6}>
<Form.Control
placeholder="Description"
value={item.description}
onChange={(e)=>handleArrayChange("featuresSection",index,"description",e.target.value)}
/>
</Col>

<Col md={6}>
<Form.Control
placeholder="Link"
value={item.link || ""}
onChange={(e)=>handleArrayChange("featuresSection",index,"link",e.target.value)}
/>
</Col>

<Col md={4}>
<Form.Control
placeholder="Color (#f47920)"
value={item.color || ""}
onChange={(e)=>handleArrayChange("featuresSection",index,"color",e.target.value)}
/>
</Col>

<Col md={2} className="d-flex align-items-center">

<Button
variant="danger"
onClick={()=>deleteFeature(index)}
>

<FaTrash/>

</Button>

</Col>

</Row>

</Card>

))}

</Card>



{/* FOUNDER SECTION */}

<Card className="p-3 mb-4">

<h5>Founder Section</h5>

<Form.Control
className="mb-3"
placeholder="Since"
value={data.founderSection?.since || ""}
onChange={(e)=>handleObjectChange("founderSection","since",e.target.value)}
/>

<Form.Control
className="mb-3"
placeholder="Title"
value={data.founderSection?.title || ""}
onChange={(e)=>handleObjectChange("founderSection","title",e.target.value)}
/>

<Form.Control
className="mb-3"
placeholder="Description"
value={data.founderSection?.description || ""}
onChange={(e)=>handleObjectChange("founderSection","description",e.target.value)}
/>

<Form.Control
placeholder="Founder Name"
value={data.founderSection?.founderName || ""}
onChange={(e)=>handleObjectChange("founderSection","founderName",e.target.value)}
/>

</Card>



{/* VIDEO SECTION */}

<Card className="p-3 mb-4">

<h5>Video Section</h5>

<Form.Control
className="mb-3"
placeholder="Title"
value={data.videoSection?.title || ""}
onChange={(e)=>handleObjectChange("videoSection","title",e.target.value)}
/>

<Form.Control
placeholder="Video URL"
value={data.videoSection?.videoUrl || ""}
onChange={(e)=>handleObjectChange("videoSection","videoUrl",e.target.value)}
/>

</Card>



{/* SERVICES SECTION */}

<Card className="p-3 mb-4">

<div className="d-flex justify-content-between align-items-center mb-3">

<h5 className="mb-0">Services Section</h5>

<Button
style={{background:"#f47920",border:"none"}}
onClick={addService}
>

<FaPlusCircle className="me-2"/>

Add Service

</Button>

</div>

{data.servicesSection?.map((service,index)=>(

<Card key={index} className="p-3 mb-3">

<Row className="g-3">

<Col md={5}>
<Form.Control
placeholder="Title"
value={service.title}
onChange={(e)=>handleArrayChange("servicesSection",index,"title",e.target.value)}
/>
</Col>

<Col md={5}>
<Form.Control
placeholder="Description"
value={service.description}
onChange={(e)=>handleArrayChange("servicesSection",index,"description",e.target.value)}
/>
</Col>

<Col md={2} className="d-flex align-items-center">

<Button
variant="danger"
onClick={()=>deleteService(index)}
>

<FaTrash/>

</Button>

</Col>

</Row>

</Card>

))}

</Card>



{/* STATS SECTION */}

<Card className="p-3 mb-4">

<div className="d-flex justify-content-between align-items-center mb-3">

<h5 className="mb-0">Stats Section</h5>

<Button
style={{background:"#f47920",border:"none"}}
onClick={addStat}
>

<FaPlusCircle className="me-2"/>

Add Stat

</Button>

</div>

{data.statsSection?.map((stat,index)=>(

<Card key={index} className="p-3 mb-3">

<Row className="g-3">

<Col md={5}>
<Form.Control
placeholder="Number"
value={stat.number}
onChange={(e)=>handleArrayChange("statsSection",index,"number",e.target.value)}
/>
</Col>

<Col md={5}>
<Form.Control
placeholder="Title"
value={stat.title}
onChange={(e)=>handleArrayChange("statsSection",index,"title",e.target.value)}
/>
</Col>

<Col md={2} className="d-flex align-items-center">

<Button
variant="danger"
onClick={()=>deleteStat(index)}
>

<FaTrash/>

</Button>

</Col>

</Row>

</Card>

))}

</Card>



{/* BLOG SECTION */}

<Card className="p-3 mb-4">

<div className="d-flex justify-content-between align-items-center mb-3">

<h5 className="mb-0">Blog Section</h5>

<Button
style={{background:"#f47920",border:"none"}}
onClick={addBlog}
>

<FaPlusCircle className="me-2"/>

Add Blog

</Button>

</div>

{data.blogSection?.map((blog,index)=>(

<Card key={index} className="p-3 mb-3">

<Row className="g-3">

<Col md={3}>
<Form.Control
placeholder="Title"
value={blog.title}
onChange={(e)=>handleArrayChange("blogSection",index,"title",e.target.value)}
/>
</Col>

<Col md={3}>
<Form.Control
placeholder="Category"
value={blog.category}
onChange={(e)=>handleArrayChange("blogSection",index,"category",e.target.value)}
/>
</Col>

<Col md={4}>
<Form.Control
placeholder="Image URL"
value={blog.image}
onChange={(e)=>handleArrayChange("blogSection",index,"image",e.target.value)}
/>
</Col>

<Col md={2} className="d-flex align-items-center">

<Button
variant="danger"
onClick={()=>deleteBlog(index)}
>

<FaTrash/>

</Button>

</Col>

</Row>

</Card>

))}

</Card>



{/* TESTIMONIAL */}

<Card className="p-3 mb-4">

<h5>Testimonial Section</h5>

<Form.Control
className="mb-3"
placeholder="Quote"
value={data.testimonialSection?.quote || ""}
onChange={(e)=>handleObjectChange("testimonialSection","quote",e.target.value)}
/>

<Form.Control
className="mb-3"
placeholder="Name"
value={data.testimonialSection?.name || ""}
onChange={(e)=>handleObjectChange("testimonialSection","name",e.target.value)}
/>

<Form.Control
placeholder="Role"
value={data.testimonialSection?.role || ""}
onChange={(e)=>handleObjectChange("testimonialSection","role",e.target.value)}
/>

</Card>



{/* SEO */}

<Card className="p-3 mb-4">

<h5>SEO Settings</h5>

<Form.Control
className="mb-3"
placeholder="Meta Title"
value={data.metaTitle || ""}
onChange={(e)=>setData({...data,metaTitle:e.target.value})}
/>

<Form.Control
as="textarea"
rows={3}
placeholder="Meta Description"
value={data.metaDescription || ""}
onChange={(e)=>setData({...data,metaDescription:e.target.value})}
/>

</Card>



<Button
style={{background: isSaving ? "#866248" : "#f47920", border:"none"}}
size="lg"
className="w-100"
onClick={updatePage}
disabled={isSaving}
>

{isSaving ? "Saving Please Wait..." : "Save Homepage"}

</Button>
</Card>
<ToastContainer position="top-end" className="p-3" style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>

<Toast
bg="success"
show={showToast}
onClose={()=>setShowToast(false)}
delay={3000}
autohide
>

<Toast.Body className="text-white fw-bold">
Homepage Updated Successfully 🚀

</Toast.Body>

</Toast>
</ToastContainer>
</Container>
)

}

export default HomeAdmin