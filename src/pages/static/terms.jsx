import React, { useContext } from 'react'
import { LangContext } from '../../context/LangContext';

function terms() {
  const { lang } = useContext(LangContext);
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-[26px] font-bold'>{lang === "En" ? "Terms & Conditions" : "Conditions générales"}</h1>
        <div className='w-[90%] lg:w-[700px] text-start py-10 flex flex-col gap-3'>
          {lang === "En" ?
            <div>
              <p>
                Buja Deals Terms and Conditions

                Last Updated: 09/05/23

                Please read these Terms and Conditions ("Terms") carefully before using the Buja Deals website (the "Service") operated by Buja Deals ("us," "we," or "our").
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>1. Acceptance of Terms</h1>

                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>2. Changes to Terms</h1>

                We reserve the right to update or change these Terms at any time without prior notice. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>3. Use of the Service</h1>

                a. You must be at least 18 years old to use the Service.
                <br />
                b. You agree to provide accurate, current, and complete information when using the Service.
                <br />
                c. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>4. Content</h1>

                a. All content on the Service, including but not limited to text, graphics, images, logos, and software, is the property of Buja Deals and is protected by copyright and other intellectual property laws.
                <br />
                b. You may not reproduce, distribute, modify, display, or create derivative works from any content on the Service without our prior written consent.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>5. Privacy</h1>
                a. Your use of the Service is also governed by our Privacy Policy.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>6. Termination</h1>
                We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for any reason, including without limitation, a breach of these Terms.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>7. Disclaimers</h1>
                a. The Service is provided "as is" without any warranties, express or implied.
                <br />
                b. We do not guarantee the accuracy, completeness, or reliability of any content on the Service.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>8. Limitation of Liability</h1>
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>9. Governing Law</h1>
                These Terms are governed by and construed in accordance with the laws of Burundi, without regard to its conflict of law principles.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>10. Contact Information</h1>
                If you have any questions about these Terms, please contact us at [contact email].
              </p>
            </div> :
            <div>
              <p>Conditions générales de Buja Deals Dernière mise à jour: 05/09/23 Veuillez lire attentivement ces conditions générales ("Conditions") avant d'utiliser le site Web de Buja Deals (le "Service") exploité par Buja Deals ("nous", "nous", ou "notre").</p>
              <p>
                <h1 className='text-[18px] font-medium'>1. Acceptation des conditions</h1>
                En accédant ou en utilisant le Service, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser le Service.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>2. Modifications des conditions</h1>
                Nous nous réservons le droit de mettre à jour ou de modifier ces Conditions à tout moment et sans préavis. Votre utilisation continue du Service après de telles modifications constitue votre acceptation des nouvelles Conditions.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>3. Utilisation du Service</h1>
                un. Vous devez avoir au moins 18 ans pour utiliser le Service.
                b. Vous acceptez de fournir des informations exactes, à jour et complètes lors de l'utilisation du Service.
                c. Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe et de la restriction de l'accès à votre compte.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>4. Contenu</h1>
                un. Tout le contenu du Service, y compris, mais sans s'y limiter, les textes, graphiques, images, logos et logiciels, est la propriété de Buja Deals et est protégé par le droit d'auteur et d'autres lois sur la propriété intellectuelle.
                b. Vous ne pouvez pas reproduire, distribuer, modifier, afficher ou créer des œuvres dérivées à partir de tout contenu du Service sans notre consentement écrit préalable.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>5. Confidentialité</h1>
                Votre utilisation du Service est également régie par notre Politique de confidentialité.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>6. Résiliation</h1>
                Nous nous réservons le droit de résilier ou de suspendre votre compte et votre accès au Service à notre seule discrétion, sans préavis, pour quelque raison que ce soit, y compris, sans s'y limiter, une violation des présentes Conditions.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>7. Avis de non-responsabilité</h1>
                un. Le Service est fourni « tel quel » sans aucune garantie, expresse ou implicite.
                b. Nous ne garantissons pas l'exactitude, l'exhaustivité ou la fiabilité de tout contenu du Service.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>8. Limitation de responsabilité</h1>
                Nous ne serons pas responsables de tout dommage indirect, accidentel, spécial, consécutif ou punitif, ni de toute perte de profits ou de revenus, qu'elle soit encourue directement ou indirectement, ou de toute perte de données, d'utilisation, de clientèle ou d'autres pertes intangibles, résultant de votre utilisation du Service.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>9. Loi applicable</h1>
                Les présentes Conditions sont régies et interprétées conformément aux lois du Burundi, sans égard à ses principes de conflit de lois.
              </p>
              <p>
                <h1 className='text-[18px] font-medium'>10. Coordonnées</h1>
                Si vous avez des questions concernant ces Conditions, veuillez nous contacter à [e-mail de contact].
              </p>
            </div>}
        </div>
        {/* <div className='w-[800px] h-[400px] bg-black p-4'></div> */}
      </div>

    </div>
  )
}
export default terms;