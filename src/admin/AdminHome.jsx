import { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"

function HomeAdmin(){

const [data,setData] = useState(null)

useEffect(()=>{

axios
.get("https://collegemilan-backend-2.onrender.com/api/admin/home")
.then(res=>setData(res.data))

},[])


const handleObjectChange = (section,field,value)=>{

setData({
...data,
[section]:{
...data[section],
[field]:value
}
})

}


const handleArrayChange = (section,index,field,value)=>{

const updated = [...data[section]]
updated[index][field] = value

setData({
...data,
[section]:updated
})

}


const updatePage = ()=>{

axios.put(
"https://collegemilan-backend-2.onrender.com/api/admin/home-page",
data
)
.then(()=>alert("Home Page Updated Successfully"))

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
placeholder="Button Text"
value={data.heroSection?.buttonText || ""}
onChange={(e)=>handleObjectChange("heroSection","buttonText",e.target.value)}
/>

</Card>



{/* FEATURES SECTION */}

<Card className="p-3 mb-4">

<h5>Features Section</h5>

{data.featuresSection?.map((item,index)=>(

<Row key={index} className="mb-3">

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
    placeholder="Icon"
    value={item.icon || ""}
    onChange={(e)=>handleArrayChange("featuresSection",index,"icon",e.target.value)}
  />
</Col>
</Row>

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
className="mb-3"
placeholder="Founder Name"
value={data.founderSection?.founderName || ""}
onChange={(e)=>handleObjectChange("founderSection","founderName",e.target.value)}
/>

<Form.Control
  placeholder="Hero Image URL"
  value={data.heroSection?.heroImage || ""}
  onChange={(e)=>handleObjectChange("heroSection","heroImage",e.target.value)}
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

<h5>Services Section</h5>

{data.servicesSection?.map((service,index)=>(

<Row key={index} className="mb-3">

<Col md={6}>
<Form.Control
placeholder="Title"
value={service.title}
onChange={(e)=>handleArrayChange("servicesSection",index,"title",e.target.value)}
/>
</Col>

<Col md={6}>
<Form.Control
placeholder="Description"
value={service.description}
onChange={(e)=>handleArrayChange("servicesSection",index,"description",e.target.value)}
/>
</Col>

</Row>

))}

</Card>



{/* STATS SECTION */}

<Card className="p-3 mb-4">

<h5>Stats Section</h5>

{data.statsSection?.map((stat,index)=>(

<Row key={index} className="mb-3">

<Col md={6}>
<Form.Control
placeholder="Number"
value={stat.number}
onChange={(e)=>handleArrayChange("statsSection",index,"number",e.target.value)}
/>
</Col>

<Col md={6}>
<Form.Control
placeholder="Title"
value={stat.title}
onChange={(e)=>handleArrayChange("statsSection",index,"title",e.target.value)}
/>
</Col>

</Row>

))}

</Card>



{/* BLOG SECTION */}

<Card className="p-3 mb-4">

<h5>Blog Section</h5>

{data.blogSection?.map((blog,index)=>(

<Row key={index} className="mb-3">

<Col md={4}>
<Form.Control
placeholder="Title"
value={blog.title}
onChange={(e)=>handleArrayChange("blogSection",index,"title",e.target.value)}
/>
</Col>

<Col md={4}>
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

</Row>

))}

</Card>



{/* TESTIMONIAL SECTION */}

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
variant="primary"
size="lg"
className="w-100"
onClick={updatePage}
>
Save Homepage
</Button>


</Card>

</Container>

)

}

export default HomeAdmin;

