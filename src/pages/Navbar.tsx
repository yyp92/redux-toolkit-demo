import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <section>
                {/* <h1>Redux 基础教程示例</h1> */}

                <div className="navContent">
                    <div className="navLinks">
                        <Link to="/">文章列表</Link>
                    </div>
                </div>
            </section>
        </nav>
    )
}

export default Navbar