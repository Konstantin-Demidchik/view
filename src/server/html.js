const Html = ({
  body,
  styles,
  tags,
  serializedState,
  contextJSON,
  serverDate,
}) => `
  <!DOCTYPE html>
  <html lang="ru">
    <head>
      <meta charset="utf-8">

      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, maximum-scale=1.0">
      <title>${tags.title}</title>
      <meta name="description" content="${tags.description}" />
      <meta property="og:title" content="${tags.og.title}" />
      <meta property="og:description" content="${tags.og.description}" />
      <meta property="og:image" content="${tags.og.image}" />

      <meta name="theme-color" content="#27262b">
      <script src="https://www.google.com/recaptcha/api.js?&render=explicit" async defer></script>
      <script src="https://www.google.com/recaptcha/api.js?onload=&render=explicit" async defer></script>
      <link rel="apple-touch-icon" sizes="57x57" href="/public/favicons/apple-icon-57x57.png">
      <link rel="apple-touch-icon" sizes="60x60" href="/public/favicons/apple-icon-60x60.png">
      <link rel="apple-touch-icon" sizes="72x72" href="/public/favicons/apple-icon-72x72.png">
      <link rel="apple-touch-icon" sizes="76x76" href="/public/favicons/apple-icon-76x76.png">
      <link rel="apple-touch-icon" sizes="114x114" href="/public/favicons/apple-icon-114x114.png">
      <link rel="apple-touch-icon" sizes="120x120" href="/public/favicons/apple-icon-120x120.png">
      <link rel="apple-touch-icon" sizes="144x144" href="/public/favicons/apple-icon-144x144.png">
      <link rel="apple-touch-icon" sizes="152x152" href="/public/favicons/apple-icon-152x152.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/public/favicons/apple-icon-180x180.png">
      <link rel="apple-touch-icon" href="/public/favicons/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="192x192"  href="/public/favicons/android-icon-192x192.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/public/favicons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="96x96" href="/public/favicons/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/public/favicons/favicon-16x16.png">

      <link rel="manifest" href="/public/manifest.json">

      <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

      <link rel="stylesheet" type="text/css" href="/build/static/css/main.44630c67.css">

      ${styles}
      <script>
        dataLayer = [];
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
        {'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N8GH2R9');
      </script>
      <script>
      	(function(i,s,o,g,r,a,m){
      	i["esSdk"] = r;
      	i[r] = i[r] || function() {
      		(i[r].q = i[r].q || []).push(arguments)
      	}, a=s.createElement(o), m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g;
      	m.parentNode.insertBefore(a,m)}
      	) (window, document, "script", "https://esputnik.com/scripts/v1/public/scripts?apiKey=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NTI0ZWZhYTJkYzI2MGRmYTM4YTE1NDBlMWEyZjE0NWRiYTMzYzE1Mzg1OGQzOTAwNjhhNTM3NmRlOTU0OTFmMzVhMmUxM2Q0OWI5ZTMyMjNhNDUzMmIyZDUyMWMyMGQxNGVmZWU1ZDJhNjQ2NGIyYjYzMTQ1OTI2NDQxYWQwNWUyOWZlZDRkNjI2NzZjNTVhMTY1YjUyNWFlOTMwNzQ5NWFkZWY2OWU5OTFmNjY1YmZiMDVhYTk1OTZhOTgyODAyZTY0In0.eTQzQb9qPSMldgMT-KMwQ_CH-A6ukJd2MvM215iTatlfxIVp0Xw5FGH17bx4zImR_GXYyNGePebJRtkP0kChCQ&domain=DF13001D-1AF8-4C5A-ACED-5C3F9011F95C", "es");
      	es("pushOn");
      </script>
    </head>

    <body>
      <noscript>
        Пожалуйста, включите поддержку JavaScript в браузере.
      </noscript>
      <div id="root">
        ${body}
      </div>
    </body>

    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N8GH2R9" height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>

    <script src="/build/static/js/main.49e831ec.js"></script>

    <script src="//code.jivosite.com/widget.js" data-jv-id="1fVMD6BpLD" async></script>

    <script>
      window.__PRELOADED_STATE__ = ${serializedState}
      window.pageData = ${contextJSON}
      window.serverDate = "${serverDate}"
    </script>
  </html>
`;

export default Html;
