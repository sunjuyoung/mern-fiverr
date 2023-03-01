import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`gig`],
    queryFn: () =>
      newRequest.get(`/gig/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [`user`],
    queryFn: () =>
      newRequest.get(`/user/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId, //userId 없으면 실행되지 않는다.
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Liverr{" > "}Graphics & Design </span>
            <h1>I will create ai generated art for you</h1>

            {isLoadingUser ? (
              "loading"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <span>{dataUser.username}</span>

                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}

                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.length > 0 ? (
                data.images.map((img) => <img key={img} src={img} alt="" />)
              ) : (
                <img
                  src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
              )}

              {/*
               */}
            </Slider>
            <h2>About This Gig</h2>
            <p>
              {data.desc}I use an AI program to create images based on text
              prompts. descriptive as you want. Being more vague will allow the
              AI to be more creative which can sometimes result in some amazing
              images. You can also be incredibly precise if you have a clear
              image of what you want in mind. All of the images I create are
              original and will be found nowhere else. If you have any questions
              you're more than welcome to send me a message.
            </p>
            {isLoadingUser ? (
              "loading"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/man.png"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}

                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {dataUser.desc}
                    My name is Anna, I enjoy creating AI generated art in my
                  </p>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
