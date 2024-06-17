import { Link } from "react-router-dom";

import './navbar.scss'
import { useContext, useEffect, useRef } from "react";
import { SessionContext, supabase } from "../supabase";

export default function NavBar() {
    const session = useContext(SessionContext);

    const nref = useRef<null | HTMLElement>(null);
    useEffect(() => {
        document
        .querySelector<HTMLElement>(":root")!
        .style.setProperty(
            "--nav-height",
            nref.current!.offsetHeight.toString() + "px"
        )
    })

    return (
        <nav ref={nref}>
            <div className=" max-w-[100rem] pnav lg:mx-auto xl:px-16">
                <div className="flex items-center gap-4">
                    <img className="h-10" src="/favicon.ico"/>
                    <div className=" border p-2 font-montserrat">LUGVITC</div>
                </div>
                <div className=" flex justify-center items-center gap-4 sm:gap-8">
                    <Link to="/">Home</Link>
                    <Link to="/apply">Apply</Link>
                    {
                        session !== null ? (
                            <button onClick={() => supabase.auth.signOut().then(({error}) => {
                                error && console.log(error);
                            })}>Log Out</button>
                        ) : null
                    }
                </div>
            </div>
        </nav>
    )
}