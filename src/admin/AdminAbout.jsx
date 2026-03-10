import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const AdminAboutUs = () => {

const [about,setAbout] = useState({
 bannerImage:"",
 story:{
  smallTitle:"",
  mainTitle:"",
  description1:"",
  description2:"",
  description3:"",
  image:"",
  since:""
 },
 mission:{title:"",description:""},
 vision:{title:"",description:""}
});

useEffect(()=>{
 axios.get("https://collegemilan-backend-2.onrender.com/api/admin/about")
 .then(res=>{
  if(res.data) setAbout(res.data)
 })
},[])

const handleChange = (e)=>{
 const {name,value}=e.target
 setAbout({...about,[name]:value})
}

const handleStoryChange = (e)=>{
 const {name,value}=e.target
 setAbout({
  ...about,
  story:{
   ...about.story,
   [name]:value
  }
 })
}

const handleSave = async ()=>{
 await axios.put("https://collegemilan-backend-2.onrender.com/api/admin/about",about)
 alert("About page updated successfully")
}

return (

<Container fluid className="p-4">

<h3 className="mb-4 fw-bold">About Page Settings</h3>

<Row>

{/* Banner Section */}

<Col md={12}>
<Card className="mb-4 shadow-sm">
<Card.Body>

<Card.Title>Banner Section</Card.Title>

<Form.Group className="mb-3">
<Form.Label>Banner Image URL</Form.Label>
<Form.Control
type="text"
name="bannerImage"
value={about.bannerImage}
onChange={handleChange}
/>
</Form.Group>

</Card.Body>
</Card>
</Col>

{/* Story Section */}

<Col md={12}>
<Card className="mb-4 shadow-sm">
<Card.Body>

<Card.Title>Story Section</Card.Title>

<Row>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Small Title</Form.Label>
<Form.Control
type="text"
name="smallTitle"
value={about.story.smallTitle}
onChange={handleStoryChange}
/>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Main Title</Form.Label>
<Form.Control
type="text"
name="mainTitle"
value={about.story.mainTitle}
onChange={handleStoryChange}
/>
</Form.Group>
</Col>

</Row>

<Form.Group className="mb-3">
<Form.Label>Description 1</Form.Label>
<Form.Control
as="textarea"
rows={3}
name="description1"
value={about.story.description1}
onChange={handleStoryChange}
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Description 2</Form.Label>
<Form.Control
as="textarea"
rows={3}
name="description2"
value={about.story.description2}
onChange={handleStoryChange}
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Description 3</Form.Label>
<Form.Control
as="textarea"
rows={3}
name="description3"
value={about.story.description3}
onChange={handleStoryChange}
/>
</Form.Group>

<Row>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Story Image</Form.Label>
<Form.Control
type="text"
name="image"
value={about.story.image}
onChange={handleStoryChange}
/>
</Form.Group>
</Col>

<Col md={6}>
<Form.Group className="mb-3">
<Form.Label>Since Text</Form.Label>
<Form.Control
type="text"
name="since"
value={about.story.since}
onChange={handleStoryChange}
/>
</Form.Group>
</Col>

</Row>

</Card.Body>
</Card>
</Col>

{/* Mission Vision */}

<Col md={6}>
<Card className="mb-4 shadow-sm">
<Card.Body>

<Card.Title>Mission</Card.Title>

<Form.Group className="mb-3">
<Form.Label>Mission Title</Form.Label>
<Form.Control
type="text"
value={about.mission.title}
onChange={(e)=>setAbout({
...about,
mission:{...about.mission,title:e.target.value}
})}
/>
</Form.Group>

<Form.Group>
<Form.Label>Mission Description</Form.Label>
<Form.Control
as="textarea"
rows={4}
value={about.mission.description}
onChange={(e)=>setAbout({
...about,
mission:{...about.mission,description:e.target.value}
})}
/>
</Form.Group>

</Card.Body>
</Card>
</Col>

<Col md={6}>
<Card className="mb-4 shadow-sm">
<Card.Body>

<Card.Title>Vision</Card.Title>

<Form.Group className="mb-3">
<Form.Label>Vision Title</Form.Label>
<Form.Control
type="text"
value={about.vision.title}
onChange={(e)=>setAbout({
...about,
vision:{...about.vision,title:e.target.value}
})}
/>
</Form.Group>

<Form.Group>
<Form.Label>Vision Description</Form.Label>
<Form.Control
as="textarea"
rows={4}
value={about.vision.description}
onChange={(e)=>setAbout({
...about,
vision:{...about.vision,description:e.target.value}
})}
/>
</Form.Group>

</Card.Body>
</Card>
</Col>

</Row>

<div className="text-end">

<Button
variant="primary"
size="lg"
onClick={handleSave}
>
Save Changes
</Button>

</div>

</Container>
)
}

export default AdminAboutUs