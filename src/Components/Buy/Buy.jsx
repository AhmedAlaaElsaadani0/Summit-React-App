import React, { useState, useEffect, lazy, startTransition } from 'react';
import ApiManger from '../JsClasses/ApiManger';
import { Helmet } from 'react-helmet-async';
import ApartmentPoster from '../Apartment/ApartmentPosterComponent/ApartmentPoster';
import ApartmentLoading from '../Apartment/ApartmentLoadingComponent/ApartmentLoading';

const Buy = () => {

  const [response, setResponse] = useState({});
  const [PageIndex, setpageIndex] = useState(1)
  const [SearchValue, setsearchValue] = useState("")
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  //DidMount
  useEffect(() => {
    startTransition(() => {
      getAllApartments();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // this main API call to get all apartments by using param
  const getAllApartments = async (searchValue = SearchValue, pageIndex = PageIndex, searchFlag = false) => {
    let response = await ApiManger.getAllApartments(`?Type=2&pageIndex=${pageIndex}&title=${searchValue}`);
    let updatedApartments = searchFlag ? [...response.data] : [...apartments, ...response.data];
    /* previous code to make the background of apartment poster in different colors but we don't need it now
    //let flag = false;
    // for (let i = apartments.length; i < updatedApartments.length; i++) {
    //   updatedApartments[i] = {
    //     flag: flag ? true : false,
    //     data: updatedApartments[i]
    //   };
    //   flag = !flag;
    // }*/
    setResponse(response);
    setApartments(updatedApartments);
    setpageIndex(response.data.length === 0 ? response.pageIndex : response.pageIndex + 1)
    setLoading(false);
  };
  // this function to get the value of search input and set it to searchValue
  const handleSearchOnChange = (e) => {
    // document.querySelectorAll('.Apartment').forEach((apartment) => {
    //   apartment.remove();
    // })
    e.preventDefault();
    if (e.target.value.length > 3) {
      setpageIndex(1);
      let value = document.getElementsByName('searchElement')[0].value;
      setsearchValue(value);
      // setApartments([]);
      getAllApartments(value, 1, true);

    }
  }
  // this function to get the value of search input and set it to searchValue when we click on Enter
  const handleSearchOnSubmit = (e) => {
    // document.querySelectorAll('.Apartment').forEach((apartment) => {
    //   apartment.remove();
    // })
    e.preventDefault();
    //when we click on Enter
    setpageIndex(1);
    let value = document.getElementsByName('searchElement')[0].value;
    setsearchValue(value);
    // setApartments([]);
    getAllApartments(value, 1, true);


  }
  // this function to load more apartments when we click on load more button
  async function loadMore() {
    let btn = document.getElementById('loadMore');
    btn.disabled = true;
    btn.innerHTML = '<i className="fa-solid fa-spinner fa-spin"></i>';
    await getAllApartments();
  }
  // When New Data is Fetched From Api we return button to it's state
  useEffect(() => {
    let btn = document.getElementById('loadMore');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Load More';
    }
  }, [apartments])

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="Keywords"
          content="
      Summit,Summit Egypt,Summit Elzahaby,Summit Elzahaby for real estate,Summit Egypt for real estate,Summit Elzahaby for real estate investment,Summit Egypt for real estate investment,Summit Elzahaby for real estate investment and urban development,Summit Egypt for real estate investment and urban development,Summit Elzahaby for real estate development,Summit Egypt for real estate development,Summit Elzahaby for real estate projects,Summit Egypt for real estate projects,Summit Elzahaby for investment,Summit Egypt for investment,Summit Elzahaby for contracting,Summit Egypt for contracting,Summit Elzahaby for contracting and real estate investment,Summit Egypt for contracting and real estate investment,Summit Elzahaby for contracting and urban development,Summit Egypt for contracting and urban development,Summit Elzahaby for contracting and real estate development,Summit Egypt for contracting and real estate development,Summit Elzahaby for contracting and real estate projects,Summit Egypt for contracting and real estate projects
      "
        />

        <meta
          name="description"
          content="
      Summit Egypt is a real estate company that offers a wide selection of apartments, villas, houses, lands, and commercial real estate for sale and rent in Egypt.
      
      "
        />

        <title>Summit Egypt-Buy</title>
      </Helmet>

      <div className='d-flex  justify-content-center align-items-center h-100 flex-wrap'>
        <form onSubmit={e => handleSearchOnSubmit(e)} action='' id='RentPageSearch' className='d-flex mt-3 widthForSearch  justify-content-center'>
          <div className='w-75 position-relative text-secondary'>
            <i className='fa-solid fa-magnifying-glass pb-3 position-absolute top-50 translate-middle-y me-3 end-0'></i>
            <input onChange={e => handleSearchOnChange(e)} name='searchElement' type='text' className='form-control-Amoor mb-3  form-label mb-0 rounded-5 p-3 pe-3'
              placeholder='Search By Title' />
          </div>
        </form>
        <div className="Apartments mt-3 w-100">
          {loading ?
            [true, false, true].map((item, index) => {
              return <ApartmentLoading key={index} flag={item} />
            })
            :
            apartments.length == 0 ? <h2 className='text-center bg-primColor text-white p-5'>Sorry, There is no Apartments Found!</h2> :
              apartments.map((item, index) => {
                return <ApartmentPoster key={index} index={index} previousPage="Area" loading={loading} flat={item} flag={index % 2 == 0 ? false : true} />
              })}
        </div>
        <div>
          {(response.count > 0 && (response.count / response.pageSize) >= response.pageIndex) ? <button onClick={loadMore} className="sButton sButtonGreen" id='loadMore'>Load More</button> : ""}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Buy;
