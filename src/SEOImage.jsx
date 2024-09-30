import React from 'react';
import { Helmet } from 'react-helmet-async';
export default function SEOImage({title, description, keywords, image}) {
return (
<Helmet>
<title>{title}</title>
<meta name='description' property="og:description" content={description} />
<meta name='image' property='og:image' content={image} />
<meta name='url' property='og:url' content='https://skillshodh.in' />
<meta name="keywords" content={keywords}></meta>
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
</Helmet>
)
}