import React from "react";
import "../css/tab3.css";
import { useState } from "react";
import tab5head from "../images/newplant.jpg";
import tab5foot from "../images/newplantfoot.jpg";
import { Link } from "react-router-dom";
import useDocumentTitle from "./useDocumentTitle";
import drimage from "../images/Tecton_BlogHeader_BeGreat 1.png";

function Kevin() {
  useDocumentTitle("ketones and concussions - Tecton");

  const [isActivep6, setIsActivep6] = useState(false);
  return (
    <div class="cone">
      <div>
        {" "}
        <img class="ico-3" src={drimage} style={{ width: "100%" }}></img>
      </div>
      <section class="read-doc">
        <div class="divide" style={{ height: "auto" }}>
          <div id="http" class="row">
            <div class="col-sm-4 divide-one">
              <div className="text-5-phone">
                <div className="font-host">
                  {" "}
                  <p
                    style={{
                      fontSize: "21px",
                      paddingLeft: "2px",
                      paddingTop: "10px",
                      marginBottom: "0px",
                    }}
                  >
                    <b> Dr. Kevin Foley </b>
                    <br />
                  </p>
                </div>

                <i style={{ color: "#757575" }}>
                  {" "}
                  M.D. , F.A.A.N.S. , F.A.C.S. , Chief Medical Officer -Tecton
                </i>
                <div style={{ paddingTop: "10px" }}>
                  Dr. Kevin Foley served in the Army Medical Corps as the Chief
                  of Neurosurgery at Walter Reed Army Medical Center, where he
                  was also the chairman of the neurosurgical residency training
                  program.
                </div>
                {isActivep6 && (
                  <div class="content-phone" style={{ padding: "0px" }}>
                    He has also served as Assistant Chief of Neurosurgery at
                    Brooke Army Medical Center and Chief of Neurosurgery at
                    Tripler Army Medical Center. He is currently the chairman of
                    Semmes-Murphey Clinic, Director of the Spine Fellowship
                    Program for the University of Tennessee Department of
                    Neurosurgery, and professor in the departments of
                    Neurosurgery and Orthopaedic Surgery & Biomedical
                    Engineering at the University of Tennessee Health Science
                    Center.
                  </div>
                )}
                <button
                  type="button"
                  style={{ paddingLeft: "0px" }}
                  class="coll-asap-phone"
                  onClick={() => setIsActivep6(!isActivep6)}
                >
                  {isActivep6 ? "Less" : "More"} &nbsp;
                  <i class="arrow down"></i>
                </button>
              </div>
              {/* <div id="dtl3">
                                <b style={{ fontSize: "117%" }}>Kevin T. Foley, M.D., F.A.A.N.S., F.A.C.S.</b>
                                <br />
                                <i>Chief Medical Officer </i>
                                <br />





                                Dr. Kevin Foley is a professor in the Departments of Neurosurgery and Orthopaedic Surgery & Biomedical Engineering at the University of Tennessee Health Science Center in Memphis, Tennessee.  He is the chairman of Semmes-Murphey Clinic and director of the spine fellowship program for the University of Tennessee Department of Neurosurgery.  Dr. Foley served in the United States Army Medical Corps as Assistant Chief of Neurosurgery at Brooke Army Medical Center, Chief of Neurosurgery at Tripler Army Medical Center, and Chief of Neurosurgery at Walter Reed Army Medical Center, where he was also the chairman of the neurosurgical residency training program. 
                           <br/>
                            </div> */}
              <div id="dtl1">
                <div>
                  <Link to="/shop">
                    <button class="divide-one-button">SHOP NOW</button>
                    <br />
                  </Link>
                  <Link to="/ambassador">
                    <button class="divide-two-button">
                      BECOME AN AMBASSADOR
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-8 divide-two">
              {/* <div id="Heads">
                                <div class="tr-ps">
                                    <h1 style={{ fontSize: "35px", color: "orange", fontWeight: "bold", marginTop: "10px", marginBottom: "9px", paddingTop: "0px" }}>Exogenous Ketones</h1>
                                </div>
                            </div> */}
              <div>
                <p
                  class="mob-h"
                  style={{
                    fontSize: "122%",
                    color: "black",

                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Can Ketones Help Mitigate Concussions?
                </p>
              </div>
              Anytime a person suffers from a traumatic brain injury (TBI), such
              as a concussion, it’s a cause for concern. The National Institute
              of Child Health and Human Development<b>¹</b> notes that just one
              TBI can lead to long-term effects. These include difficulty
              learning, tinnitus (ringing in the ears), trouble communicating,
              behavioral issues, and emotional challenges, including mood
              swings, depression, and anxiety. There are currently no
              FDA-approved medications to prevent these and other neurological
              issues that can result from TBI. However, there is growing
              evidence that a natural alternative approach could help TBI
              patients as they heal – ketones.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                <b>Are Ketones Neuroprotective?</b>
              </p>
              ​Ketones are{" "}
              <a
                href="https://tectonlife.com/science/ketonesandsugar"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                naturally occurring energy sources.
              </a>{" "}
              The liver produces ketones when there is a relative lack of
              carbohydrates (glucose, i.e., sugar), creating them from fatty
              acids. The liver turns fat into ketones, which enter the
              bloodstream and circulate around your body, including your brain.
              (Note: ketones can cross the blood-brain barrier)
              <br />
              <br />
              More research is needed on the neuroprotective nature of ketones.
              However, preliminary studies<b>²</b> on animals show that ketones
              could help fight energy deficits in TBI patients. They can lower
              inflammation, neurodegeneration, and oxidative stress resulting
              from an excess production of free radicals.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                <b> The Role of Ketones in Post-Concussion Therapy</b>
              </p>
              Understanding how ketones can benefit concussion patients is
              critical, especially during the early stages of a concussion or
              other TBI.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "#757575",
                }}
              >
                {" "}
                <b>Why the brain needs energy post-concussion</b>
              </p>
              Scientists know<b>³</b> that brain glucose levels rise early in a
              TBI before dropping to below-normal levels. Therefore, giving
              patients additional glucose to help in recovery can be
              detrimental. Too much glucose may create more lactic acid in the
              brain<b>³</b>, which limits the brain’s ability to use energy from
              non-glucose sources.
              <br />
              <br />
              Glucose levels rise early in a concussion because the brain is
              starving for fuel. The brain needs the energy from glucose to heal
              itself from the injury it has suffered, whether mild or severe.
              <br />
              <br />
              However, the rise in glucose levels after a TBI is temporary.
              Scientists call this a “metabolic cascade,”<b>⁵</b> which refers
              to a series of metabolic events that occur throughout the body.
              These events significantly alter the body’s metabolism following a
              concussion. As part of that cascade, glucose uptake significantly
              diminishes, and the brain’s ability to use glucose is impaired.
              This leaves the brain in a state of lowered metabolism, known as
              hypometabolism.
              <br />
              <br />
              Just as the brain is needing a greater energy supply to help it
              heal from a TBI, its ability to produce and utilize energy is
              impaired by that same injury. This situation has been termed an
              “energy crisis.” This state can last for weeks or even months. It
              can result in post-concussion symptoms such as headaches, mood
              changes, irritability, and cognition challenges. Researchers have
              found<b>⁶</b> a correlation between hypometabolism and mood
              disorders. They conclude that post-concussion patients with a
              lower metabolism in their frontal lobe are more likely to
              experience anxiety and depression than those with a higher
              metabolism.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "#757575",
                }}
              >
                {" "}
                <b>Ketones as an alternative fuel source</b>
              </p>
              So, how can concussion patients get the energy their brain needs
              without glucose?
              <br />
              <br />
              Ketones may be the answer.
              <br />
              <br />
              Ketones are an alternative energy source that can reduce the
              brain’s reliance on glucose metabolism. Instead, the brain can
              metabolize ketones as an energy source.
              <br />
              <br />
              ​Studies have shown<b>⁷</b> that a ketogenic diet is safe for
              post-TBI treatment in both animals and humans. There have also
              been several studies exploring the effects of ketones on animals
              with a TBI, finding that ketones are both safe and effective in
              helping individuals with a TBI.
              <br />
              <br />
              One way to achieve the benefit of ketones is through fasting. For
              example, scientists have found<b>⁵</b> that the number of ketone
              bodies produced and used by the brain increased in infant and
              adult rats when they were starved. This suggests that the body
              will turn to an alternative energy source when faced with
              starvation.
              <br />
              <br />
              The effects of starvation can be replicated through intentional
              fasting. Another study<b>⁸</b> conducted on rats found that
              fasting for 24 hours following a TBI reduced the biomarkers of
              calcium loading and oxidative stress in mitochondria that were
              isolated from the injury site. Note: “oxidative stress” is a
              condition where the production of free radicals overwhelms the
              body’s ability to render these radicals inactive—and is associated
              with multiple known human disease states. The researchers
              concluded that a 24-hour fast offered neuroprotection and improved
              mitochondrial function.
              <br />
              <br />
              Of course, the goal is not to starve a patient with a concussion.
              Instead, why not supply the patient with an energy source that
              could potentially help the brain heal and provide some of the
              benefits seen in the fasting animal studies?
              <br />
              <br />
              Scientists theorize<b>⁷</b> that finding a way to fill the energy
              deficit during a concussion could reduce the likelihood and
              severity of post-concussion symptoms. So, it is possible that
              increasing ketone levels in the brain of a concussion patient can
              help mitigate the damage, potentially improve the healing process,
              and perhaps even reduce or eliminate the long-term effects of TBI.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>How to Increase Ketones in Your Brain</b>
              </p>
              Many people turn to a ketogenic diet to raise ketone levels in
              their brains. However, the carb-restricting ketogenic diet may not
              be feasible or healthy for all concussion patients, particularly
              adolescents and teenagers who require energy from carbohydrates to
              help them grow and develop. Moreover, many individuals may have
              difficulty adhering to such a diet plan.
              <br />
              <br />
              It typically takes about two days (48 hours)<b>⁹</b> for an
              individual to get into a state of ketosis after beginning a
              strictly keto diet. Therefore, starting a keto diet after
              suffering a concussion could delay getting precious ketone energy
              to the brain. Even a slight miscalculation of carb intake could
              prevent or delay ketosis from occurring.
              <br />
              <br />
              There are other ways to elevate ketone levels in the brain without
              adopting a keto diet. And of course, you can always supplement a
              more modified keto diet (i.e., one that is not so restrictive) to
              insure against accidental carb miscalculation.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>Using Exogeneous Ketones in Post-Concussion Recovery</b>
              </p>
              The simplest way to get more ketones into the brain is through
              exogenous ketones, otherwise known as ketone supplements. These
              are available in a few forms, including ketone salts and ketone
              esters.
              <br />
              <br />
              Ketone esters contain more Beta-Hydroxybutyrate (BHB) than ketone
              salts. BHB is a vital ketone that acts as an energy source when
              glucose levels are low. It’s one of three natural ketones the body
              produces and presents in larger quantities than the other.
              Therefore, ketone esters can increase ketone levels faster than
              ketone salts.
              <br />
              <br />
              ​This efficiency makes ketone esters a preferable source of
              ketones during post-TBI treatment and healing. During a time when
              the brain needs quick recovery, being able to get the energy to it
              as quickly as possible is essential.
              <br />
              <br />
              ​Researchers have found<b>⁴</b> exogenous ketones to be safe and
              effective in helping people get into a state of ketosis without
              resorting to a strict keto diet.
              <br />
              <br />
              <p
                class="mob-h"
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>How Tecton Can Increase Ketone Levels</b>
              </p>
              Before recommending our product as a source of ketone esters, we
              wanted to test the absorption rate to determine how quickly Tecton
              ketones will get into the bloodstream after drinking a can of our
              product. So, in partnership with Mayo Clinic, Tecton conducted a{" "}
              <a
                href="https://tectonlife.com/science/pkstudy"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                pharmacokinetics (PK) study
              </a>{" "}
              to learn how quickly ketone levels elevate after consuming our
              product.
              <br />
              <br />
              The results showed that Tecton’s ketone ester has a rapid
              absorption rate, reaching a maximum concentration in just 30
              minutes. Our results compare favorably with the top ketone ester
              products on the market. Drinking a can of Tecton every 3 hours
              during the initial days of concussion could help the recovery
              process. It can be a bridge strategy for those who wish to
              consider dietary ketosis, as it could take 2-3 days for a strict
              ketogenic diet to achieve adequate ketone levels.
              <br />
              <br />
              ​Tecton is the world’s first and only ready-to-drink beverage that
              contains 10g of nature-identical ketones proven to be safe at any{" "}
              <a
                href="https://www.mdpi.com/2072-6643/14/20/4426/htm"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                dose
              </a>{" "}
              and for all age groups. Unlike other exogenous ketone sources,
              Tecton doesn’t contain 1,3 butanediol (a secondary alcohol or
              ethanol dimer). Tecton is a simple and safe alternative, or
              accompaniment, to fasting or a restrictive ketogenic diet. Try it
              for yourself by{" "}
              <a
                href="https://tectonlife.com/shop"
                target="_blank"
                style={{ textDecoration: "underline" }}
              >
                {" "}
                ordering Tecton today.
              </a>
              <br />
              <br />
              <span style={{ color: "#757575" }}>
                *The Food and Drug Administration has not evaluated these
                statements. This product is not intended to diagnose, treat,
                cure, or prevent any disease.
              </span>
              <br />
              <br />
              <br />
              <div id="dtl2">
                <div class="col-sm-4 divide-one">
                  <div class="text-center">
                    <Link to="/shop">
                      <button class="divide-one-button">SHOP NOW</button>
                      <br />
                    </Link>
                    <Link to="/ambassador">
                      <button class="divide-two-button">
                        BECOME AN AMBASSADOR
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: "122%",
                  color: "black",
                }}
              >
                {" "}
                <b>References</b>
              </p>
              <ol className="noteol" style={{ color: "#757575" }}>
                <li>
                  U.S. Department of Health and Human Services. (2020, November
                  24). What are the possible effects of Traumatic Brain Injury
                  (TBI)? Eunice Kennedy Shriver National Institute of Child
                  Health and Human Development. Retrieved October 7, 2022, from
                  https://www.nichd.nih.gov/health/
                  topics/tbi/conditioninfo/effects
                  <a
                    href=" https://www.nichd.nih.gov/health/topics/tbi/conditioninfo/effects "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Blaise, J. H., Ruskin, D. N., Koranda, J. L., & Masino, S. A.
                  (2015, May 25). Effects of a ketogenic diet on hippocampal
                  plasticity in freely moving juvenile rats. The Psychological
                  Society. Retrieved October 7, 2022, from
                  https://physoc.onlinelibrary.
                  wiley.com/doi/full/10.14814/phy2.15412
                  <a
                    href="https://physoc.onlinelibrary.wiley.com/doi/full/10.14814/phy2.15412"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Robertson, C. S., Goodman, J. C., Narayan, R. K., Contant, C.
                  F., & Grossman, R. G. (1991, January 1). The effect of glucose
                  administration on carbohydrate metabolism after head injury.
                  jns. Retrieved October 7, 2022, from https://thejns.org/view/
                  journals/j-neurosurg/74/1/article-p43.xml
                  <a
                    href="https://thejns.org/view/journals/j-neurosurg/74/1/article-p43.xml"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  {" "}
                  Daines, S. A. (2021, October 22). The therapeutic potential
                  and limitations of ketones in traumatic brain injury.
                  Frontiers in Neurology. Retrieved October 7, 2022, from
                  https://www.frontiersin.org/
                  articles/10.3389/fneur.2021.723148/{" "}
                  <a
                    href="https://www.frontiersin.org/articles/10.3389/fneur.2021.723148/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Giza, C. C., & Hovda, D. A. (2001, September). The
                  neurometabolic cascade of concussion. Journal of athletic
                  training. Retrieved October 7, 2022, from
                  https://www.ncbi.nlm.nih.gov/ pmc/articles/PMC155411/
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC155411/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Teichner, E. M., You, J. C., Hriso, C., Wintering, N. A.,
                  Zabecky, G. P., Abass, A., Bazzan, A. J., Monti, D. A., &
                  Newberg, A. B. (2021, July). Alterations in cerebral glucose
                  metabolism as measured by... : Nuclear medicine
                  communications. LWW. Retrieved October 7, 2022, from
                  https://journals.lww.com/ nuclearmedicinecomm
                  /Fulltext/2021/07000/Alterations_
                  in_cerebral_glucose_metabolism_as.9.aspx
                  <a
                    href="https://journals.lww.com/nuclearmedicinecomm/Fulltext/2021/07000/Alterations_in_cerebral_glucose_metabolism_as.9.aspx"
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Rippee, M. A., Chen, J., & Taylor, M. K. (2020, September 10).
                  The ketogenic diet in the treatment of post-concussion
                  syndrome-A feasibility study. Frontiers in nutrition.
                  Retrieved October 7, 2022, from https://www.ncbi.nlm.nih.gov/
                  pmc/articles/PMC7511571/
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7511571/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>
                <li>
                  Davis, L. M., Pauly, J. R., Readnower, R. D., Rho, J. M., &
                  Sullivan, P. G. (2008, February 1). Fasting is neuroprotective
                  following traumatic brain injury. Shibboleth authentication
                  request. Retrieved October 7, 2022, from
                  https://pubmed.ncbi.nlm.nih.gov/18241053/
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/18241053/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>

                <li>
                  Wirrell, E. C., Darwish, H. Z., & Williams-Dyjur, C. (2002,
                  March). Is a fast necessary when initiating the ketogenic
                  diet? National Center for Biotechnology Information. Retrieved
                  October 18, 2022, from
                  https://pubmed.ncbi.nlm.nih.gov/?otool=ohccalib/
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/12026232/ "
                    target="_blank"
                    style={{ color: "black", textDecoration: "underLine" }}
                  >
                    More
                  </a>
                </li>

                <br />
                <br />
              </ol>
            </div>
          </div>

          {/* <div id="http-two" class="row">
                        <div class="col-sm-8 divide-three">
                            <div id="dtl4">
                                <div class="Asidee">
                                    <b style={{ fontSize: "117%" }}>Kevin T. Foley, M.D., F.A.A.N.S., F.A.C.S.</b>
                                    <br />
                                    <i>Chief Medical Officer </i>
                                    <br />





                                    Dr. Kevin Foley is a professor in the Departments of Neurosurgery and Orthopaedic Surgery & Biomedical Engineering at the University of Tennessee Health Science Center in Memphis, Tennessee.  He is the chairman of Semmes-Murphey Clinic and director of the spine fellowship program for the University of Tennessee Department of Neurosurgery.  Dr. Foley served in the United States Army Medical Corps as Assistant Chief of Neurosurgery at Brooke Army Medical Center, Chief of Neurosurgery at Tripler Army Medical Center, and Chief of Neurosurgery at Walter Reed Army Medical Center, where he was also the chairman of the neurosurgical residency training program. Dr. Kevin Foley is a professor in the Departments of Neurosurgery and Orthopaedic Surgery & Biomedical Engineering at the University of Tennessee Health Science Center in Memphis, Tennessee.  He is the chairman of Semmes-Murphey Clinic and director of the spine fellowship program for the University of Tennessee Department of Neurosurgery.  Dr. Foley served in the United States Army Medical Corps as Assistant Chief of Neurosurgery at Brooke Army Medical Center, Chief of Neurosurgery at Tripler Army Medical Center, and Chief of Neurosurgery at Walter Reed Army Medical Center, where he was also the chairman of the neurosurgical residency training program.  </div>
                                <br />
                            </div>
                        </div>




                    </div> */}
        </div>
      </section>
    </div>
  );
}

export default Kevin;
