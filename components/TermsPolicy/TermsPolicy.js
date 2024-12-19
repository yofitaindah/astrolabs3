import Link from "next/link";
import React from "react";

const TermsPolicy = () => {
  return (
    <>
      <div className="rbt-main-content mb--0 mr--0">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content">
            <div className="banner-area">
              <div className="settings-area">
                <h3 className="title">How To Buy</h3>
              </div>
            </div>
            <div className="content-page pb--50">
              <div className="chat-box-list">
                <div className="content">
                  <h4>Create A Wallet</h4>
                  {/* <ol> */}
                    <li>
                      Download and set up your wallet of choice (we reccomend metamask.io). You can download the extension or use the mobile app at no cost. Ensure to keep your recovery phrase in a secure location.
                    </li>
                  {/* </ol> */}

                  <br/>

                  <h4>The type of personal information we collect</h4>

                  <ol>
                    <li>
                      We collect certain personal information about visitors and
                      users of our Sites.{" "}
                      <Link href="http://rainbowit.net/themes/imroz">
                        http://rainbowit.net/themes/imroz
                      </Link>
                    </li>
                    <li>
                      Ut enim ad minima veniam, quis nostrum exercitationem
                      ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                      commodi consequatur? Quis autem vel eum iure reprehenderit
                      qui in ea voluptate velit esse quam nihil molestiae
                      consequatur, vel illum qui dolorem eum fugiat quo voluptas
                      nulla pariatur.
                    </li>
                  </ol>

                  <h4>How we collect personal information</h4>

                  <ol>
                    <li>
                      I must explain to you how all this mistaken idea of
                      denouncing pleasure and praising pain was born and I will
                      give you a complete account of the system, and expound the
                      actual teachings.
                    </li>
                    <li>
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis praesentium voluptatum deleniti atque
                      corrupti quos dolores et quas molestias excepturi sint
                      occaecati cupiditate non provident similique sunt in culpa
                      qui officia deserunt mollitia animi, id est laborum et
                      dolorum fuga.
                    </li>
                    <li>
                      On the other hand, we denounce with righteous indignation
                      and dislike men who are so beguiled and demoralized by the
                      charms of pleasure of the moment, so blinded by desire,
                      that they cannot foresee the pain and trouble that are
                      bound to ensue; and equal blame belongs to those who fail
                      in their duty through weakness of will, which is the same
                      as saying through shrinking from toil and pain. These
                      cases are perfectly simple and easy to distinguish. In a
                      free hour, when our power of choice is untrammelled and
                      when nothing prevents our being able to do what we like
                      best, every pleasure is to be welcomed and every pain
                      avoided. But in certain circumstances and owing to the
                      claims of duty or the obligations{" "}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPolicy;
