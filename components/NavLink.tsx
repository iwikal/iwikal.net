import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps extends LinkProps {
  children: ReactNode
}

export default function NavLink(props: NavLinkProps) {
  const { pathname } = useRouter()
  const currentPage = props.href === pathname

  const { children, ...linkProps } = props

  const currentPageProps = currentPage
    ? { tabIndex: -1, className: 'current' }
    : undefined

  return (
    <Link {...linkProps}>
      <a {...currentPageProps} onClick={(e) => e.currentTarget.blur()}>
        {children}
      </a>
    </Link>
  )
}
