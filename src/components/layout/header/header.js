/* Vendor imports */
import React, { Component } from 'react'
import { Link } from 'gatsby'
import { FaBars, FaTimes } from 'react-icons/fa'
/* App imports */
import style from './header.module.less'
import Config from '../../../../config'
import Utils from '../../../utils'
import LogoKopidev from '../../../images/logo-kopidev.png'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      lastScrollY: 0,
      fixedHeader: false,
      collapsedMenu: true,
    }
    this.toggleFixedHeader = this.toggleFixedHeader.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleFixedHeader)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleFixedHeader)
  }

  toggleFixedHeader() {
    if (!this.toggleFixedHeader.animationInProgress) {
      this.toggleFixedHeader.animationInProgress = true
      setTimeout(() => {
        this.setState(
          {
            lastScrollY: window.scrollY,
            fixedHeader:
              window.scrollY > 100 && this.state.lastScrollY < window.scrollY,
          },
          () => (this.toggleFixedHeader.animationInProgress = false)
        )
      }, 200)
    }
  }

  toggleMenu() {
    this.setState({
      collapsedMenu: !this.state.collapsedMenu,
    })
  }

  render() {
    return (
      <header
        className={style.container}
        style={this.state.fixedHeader ? { backgroundImage: 'none' } : null}
      >
        <div className={style.titleContainer}>
          <div className={style.title}>
            <Link to={Utils.resolvePageUrl(Config.pages.home)}>
              <div className={style.LogoKopidev}>
                <img src={LogoKopidev} alt={Config.siteTitle} />
              </div>
            </Link>
          </div>
          <div className={style.menuButton}>
            {this.state.collapsedMenu ? (
              <FaBars size="30" onClick={this.toggleMenu} />
            ) : (
              <FaTimes size="30" onClick={this.toggleMenu} />
            )}
          </div>
        </div>
        <div
          className={[
            style.list,
            this.state.collapsedMenu ? style.collapsedMenu : style.expandedMenu,
          ].join(' ')}
        >
          <ul>
            <li>
              <Link to={Utils.resolvePageUrl(Config.pages.home)}>Home</Link>
            </li>
            <li>
              <Link to={Utils.resolvePageUrl(Config.pages.about)}>About</Link>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header
