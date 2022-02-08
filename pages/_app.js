import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Link from 'next/link';
import {Navbar} from 'rbx/components/navbar'
import {Field, Control} from 'rbx/elements/form'
import {Button} from 'rbx/elements/button'
import 'rbx/index.css'

const color = 'light';

class FFXIVApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <style jsx global>{`
          * {
            box-sizing: border-box;
          }
          html, body, body > div {
            height: 100%;
          }
        `}</style>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <div style={{display: 'flex', minHeight: '100%'}}>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <Navbar color={color}>
              <Navbar.Brand>
                <Link href='/'>
                  <Navbar.Item>
                    FFXIV Tools
                  </Navbar.Item>
                </Link>
                <Navbar.Burger />
              </Navbar.Brand>
              <Navbar.Menu>
                <Navbar.Segment align="start">
                  <Link href='/beast-tribes'>
                    <Navbar.Item>Beast Tribes</Navbar.Item>
                  </Link>
                  <Link href='/dailies'>
                    <Navbar.Item>Dailies</Navbar.Item>
                  </Link>
                  <Link href='/completion'>
                    <Navbar.Item>Completion</Navbar.Item>
                  </Link>
                  <Navbar.Item dropdown hoverable>
                    <Navbar.Link href="https://bulma.io/documentation/overview/start/">
                      Docs
                    </Navbar.Link>
                    <Navbar.Dropdown boxed>
                      <Navbar.Item href="https://bulma.io/documentation/overview/start/">
                        Overview
                      </Navbar.Item>
                      <Navbar.Item href="https://bulma.io/documentation/modifiers/syntax/">
                        Modifiers
                      </Navbar.Item>
                      <Navbar.Item href="https://bulma.io/documentation/columns/basics/">
                        Columns
                      </Navbar.Item>
                      <Navbar.Item href="https://bulma.io/documentation/layout/container/">
                        Layout
                      </Navbar.Item>
                      <Navbar.Item href="https://bulma.io/documentation/form/general/">
                        Form
                      </Navbar.Item>
                      <Navbar.Divider />
                      <Navbar.Item href="https://bulma.io/documentation/elements/box/">
                        Elements
                      </Navbar.Item>
                      <Navbar.Item
                        active
                        href="https://bulma.io/documentation/components/breadcrumb/"
                      >
                        Components
                      </Navbar.Item>
                    </Navbar.Dropdown>
                  </Navbar.Item>
                </Navbar.Segment>
                <Navbar.Segment align="end">
                  <Navbar.Item as="div">
                    <Field kind="group">
                      <Control>
                        <Button as="a" color="info" href="https://twitter.com">
                          <span>Tweet</span>
                        </Button>
                      </Control>
                      <Control>
                        <Button
                          as="a"
                          color="primary"
                          href="https://github.com/dfee/rbx"
                        >
                          <span>GitHub</span>
                        </Button>
                      </Control>
                    </Field>
                  </Navbar.Item>
                </Navbar.Segment>
              </Navbar.Menu>
            </Navbar>
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default FFXIVApp
