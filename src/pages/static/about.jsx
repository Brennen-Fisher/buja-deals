import React, { useContext } from 'react'
import { LangContext } from '../../context/LangContext';

function about() {
  const { lang } = useContext(LangContext);
  return (
    <div>
      <img src="https://as2.ftcdn.net/v2/jpg/02/67/56/69/1000_F_267566919_AwxtcD1rDIpP3Kkv9gP9q1UYBQjKyEGz.jpg" className='w-full max-h-[350px] object-cover overflow-hidden' />
      <h1 className='font-bold text-[26px] p-[50px]'>{lang === "En" ? "About" : "à propos"}</h1>
      <div className='flex w-full p-[50px] pt-0 items-center justify-center'>
        <div className='max-w-[1000px]'>
          {lang === "En" ?
            <p className='text-[18px] text-start'>
              Buja Deals is leading the charge in reshaping the real estate landscape.
              As the highest rated real estate hub, Buja Deals and its affiliated entities offer a comprehensive on-demand platform for buying, selling, and renting properties.
              Our team of dedicated professionals is here to guide you on your journey toward owning a new home or car.
              <img src="https://as1.ftcdn.net/v2/jpg/02/16/72/56/1000_F_216725667_yUoZOraKR7FVLI1ThPWX1kMUQBSCxQzl.jpg" className='w-[600px] hidden lg:block lg:float-left mr-3 mt-2' />
              &nbsp;Discover the Buja Deals advantage, where user-friendly online tools make navigating listings and connecting with sellers or agents effortless. We also provide expert guidance and a vibrant community to share your real estate journey.
              Buja Deals isn't just about transactions; it's about partnerships and the commitment to your future. Dive into Buja Deals today and explore resources, browse listings, and reach out to our friendly staff for any inquiries or concerns.
              Your next chapter awaits with Buja Deals.
            </p> :
            <p className='text-[18px] text-start'>
              Buja Deals remodèle le paysage immobilier pour rationaliser votre parcours vers le prochain chapitre de votre vie.
              <img src="https://as1.ftcdn.net/v2/jpg/02/16/72/56/1000_F_216725667_yUoZOraKR7FVLI1ThPWX1kMUQBSCxQzl.jpg" className='w-[600px] hidden lg:block lg:float-left mr-3 mt-2' />
              En tant que plateforme immobilière la plus fréquentée aux Burundi, Buja Deals et ses entités affiliées offrent aux clients une plateforme à la demande pour la vente, l'achat, la location et le financement des voitures et Maisons.
              Notre personnel professionnel est disponible pour vous aider à faire de bons choix et vous rapprocher de l&apos;acquisition d&apos;une nouvelle maison ou d&apos;une nouvelle voiture!
            </p>}
          <img src="https://as1.ftcdn.net/v2/jpg/02/16/72/56/1000_F_216725667_yUoZOraKR7FVLI1ThPWX1kMUQBSCxQzl.jpg" className='w-[600px] lg:hidden mr-3 mt-2' />
        </div>
      </div>
    </div>
  )
}

export default about;