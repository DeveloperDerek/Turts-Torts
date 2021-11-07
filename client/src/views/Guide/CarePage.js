import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AnimalLinks from "../../components/AnimalLinks";

const CarePage = () => {
    const [turtles, setTurtles] = useState(null);

    useEffect(() => {
        axios
        .get("/api/animal/all")
        .then((res) => {
            console.log(res.data);
            setTurtles(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    if (turtles === null) {
        return(<div>Loading....</div>)
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row p-3">
                    <AnimalLinks />
                    {/* General Care Guide */}
                    <div className="col-md col-sm">
                        <h1 className="display-5 text-center">Turtles can make great pets, but do your homework first</h1>
                        <img className="img-fluid rounded mx-auto d-block" src="https://scx1.b-cdn.net/csz/news/800a/2018/turtlescanma.jpg" />
                        <p className="text-muted text-center"><small>Two Russian Tortoises beside each other</small></p>
                        <hr />
                        <p>While turtles may seem like a great low maintenance pet - less work than dogs and cats, more interactive than fish - there are a few things to keep in mind before making the purchase.</p>
                        <p>Consider the source of where that turtle came from. You should never take a wild turtle as a pet because chances are they wont adapt well in captivity. Always look to adopt from a local turtle society or purchase one from a reputable breeder. Also be sure to check local laws before deciding what picking which turtle to pet. Some states, like New Jersey, require permits for pet turtles, largey due to concerns about already stressed populations of native turtles.</p>
                        <p>While turtles may seem small and harmless, many turtles carry salmonella. Salmonella can not be seen, smelled, or tasted. It is a typ of bacteria that can cause upset stomach, diarrhea, fever, and pain in the stomach. Young children, the elderly, pregnant women, and others at risk should avoid contact with turtles or be extra careful to wash their hands thoroughly after touching them. The Centers for Disease Control and Prevention urge people to treat all turtles as if they are contaminated with salmonella, because they probably are.</p>
                        <div className="clearfix">
                            <img className="img-fluid col-md-7 float-md-end mb-3 ms-md-3" src="https://cdn0.wideopenpets.com/wp-content/uploads/2016/02/turt-770x405.jpg" />
                            <p className="lead">Turtle or Tortoise? What's the Difference?</p>
                            <p>"Turtle" is the umbrella term for all 200 species of the testudine group, which includes turtles, tortoises, and terapins. All turtles have two distinct features: A shell to which their ribs and vertebrae are fused, and a pelvic girdle that sits inside their rib cage. Turtles can be aquatic, semi-aquatic, or mostly terrestrial. Tortoises are turtles that live on land and are not equipped for water.</p>
                            <p>A tortoise has a dome-shaped shell and short and sturdy feet. Its legs are bent instead of being straight and directly under the body. A turtle has a flat, streamlined shell built for swimming. An easy way to tell a tortoise from a turtle is to look at its feet. Tortoises being exclusively land creatures have feet that look similar to tiny elephant feet designed for trucking through on land or burrowing below it. Aquatic turtles have feet that are webbed designed for swimming. The diet between the two is also different. While tortoises are generall vegetarians, other turtles are omnivorous eating plant matter along with insects, fish, and crustaceans.</p>
                        </div>
                        <div className="clearfix">
                            <img className="img-fluid col-md-5 float-md-start mb-3 ms-md-3 me-3" src="https://cdn1.bigcommerce.com/server700/6bee4/product_images/uploaded_images/Sulcata2.JPG?_ga=2.111403012.1249514110.1524237470-546948814.1524237470" />
                            <p className="lead">Picking the Right Variety</p>
                            <p>Although all turtles start off hatched out of an egg small, some turtles can grow to the size of a garbage can lid. There are some species of tortoises that can even grow over 200 lbs. That is why it is important to do your homework ahead of time when selecting a type and gender of turtle to have as a pet. A good thing to keep in mind is that in many turtle species the females grow to be much larger than their male conterparts.</p>
                            <p>Although they seem to be low maintenance, turtles require more care and space than people generally assume. They require a varied and sometimes messy diet, room to roam around, and strict temperature control. Being cold blooded reptiles, they require UVA and UVB rays to keep them happy and healthy. If being housed indoors that would require a lamp system. With such a long life span, your pet turtle may even outlive you.</p>
                            <p>Besides all of that, turtles can be beautiful pets. These prehistoric creatures have roamed the earth for millions of years and make a wonderful hardy pet to have. Just know what you're getting into, and how to care for them properly to ensure a healthy life for the turtle and its owner. They have extremely interesting and individual personalities. For more expert advise you can seek out a local turtle and tortoise society or contact us with your questions.</p>
                        </div>
                        <img className="img-fluid rounded w-100 pt-5" src="https://www.petsulcata.com/wp-content/uploads/2019/11/Outdoor-Enclosure-for-a-Baby-Sulcata.jpg" />
                        <p className="text-muted text-center"><small>A great outdoor tortoise enclosure example</small></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CarePage;