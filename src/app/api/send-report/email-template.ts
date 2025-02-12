export const generateEmailTemplate = (
    name: string,
    totalCarbon: number,
    totalTrees: number,
    recommendationsList: string[]
) => {
    const annualEmissionTonnes = totalCarbon / 1000; // Convert kg to tonnes
    const idealEmission = 2.0;   // Tonnes per year - Ideal sustainable level
    const averageEmission = 4.8; // Tonnes per year - Global average
    const treeSequestrationRate = 0.02;  // tonnes CO2 per tree per year
    const treesToOffset = Math.floor(annualEmissionTonnes / treeSequestrationRate);

    // Calculate offset percentage for rating
    const hypotheticalTreesOffset = totalTrees;
    const emissionOffsetByTrees = hypotheticalTreesOffset * treeSequestrationRate;
    const percentageOffset = (annualEmissionTonnes > 0) ? (emissionOffsetByTrees / annualEmissionTonnes) * 100 : 0;

    const getEffortRating = (percentageOffset: number) => {
        let effortRating: string;
        let ratingMessage: string;
        let starRating: string;

        if (percentageOffset >= 50) {
            effortRating = "Excellent";
            ratingMessage = "You are making a significant effort to offset your emissions!";
            starRating = "5/5";
        } else if (percentageOffset >= 20) {
            effortRating = "Good";
            ratingMessage = "Your effort to offset emissions is commendable.";
            starRating = "4/5";
        } else if (percentageOffset >= 10) {
            effortRating = "Fair";
            ratingMessage = "You've started offsetting, which is a good step.";
            starRating = "3/5";
        } else if (percentageOffset >= 5) {
            effortRating = "Needs Work";
            ratingMessage = "Consider increasing your offset efforts.";
            starRating = "2/5";
        } else {
            effortRating = "Beginning";
            ratingMessage = "Start your journey to carbon neutrality.";
            starRating = "1/5";
        }
        return { effortRating, ratingMessage, starRating };
    };

    const { effortRating, ratingMessage, starRating } = getEffortRating(percentageOffset);

    const recommendationListHtml = recommendationsList.map(rec => {
        const [questionLine, choiceLine, recommendationLine] = rec.split('\n');
        return `
            <tr>
                <td align="left" style="padding:0;Margin:0;padding-bottom:10px">
                    <h3 style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:bold;line-height:22px;color:#1F4656">${questionLine}</h3>
                    <p style="Margin:5px 0;font-family:Manrope, Arial, sans-serif;line-height:18px;color:#666666;font-size:14px">${choiceLine}</p>
                </td>
            </tr>
            <tr>
                <td align="left" style="padding:0;Margin:0;padding-bottom:20px">
                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#1F4656;font-size:14px">${recommendationLine}</p>
                </td>
            </tr>
        `;
    }).join('');

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="und">
    <head>
        <meta http-equiv="Content-Security-Policy" content="script-src 'none'; connect-src 'none'; object-src 'none'; form-action https://cdn.ampproject.org https://amp.stripo.email;">
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Your Carbon Emission & Tree Offset Report</title>
        <link href="https://fonts.googleapis.com/css2?family=Imprima&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">
        <style type="text/css">
            .rollover:hover .rollover-first { max-height:0px!important; display:none!important;}
            .rollover:hover .rollover-second { max-height:none!important; display:block!important;}
            .rollover span { font-size:0px;}
            u + .body img ~ div div { display:none;}
            #outlook a { padding:0;}
            span.MsoHyperlink,span.MsoHyperlinkFollowed { color:inherit; mso-style-priority:99;}
            a.n { mso-style-priority:100!important; text-decoration:none!important;}
            a[x-apple-data-detectors],#MessageViewBody a { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important;}
            .d { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all;}
            @media only screen and (max-width:600px) {
                .be { padding-right:0px!important }
                .bd { padding-bottom:20px!important }
                .bc { padding-left:0px!important }
                *[class="gmail-fix"] { display:none!important }
                p, a { line-height:150%!important }
                h1, h1 a { line-height:120%!important }
                h2, h2 a { line-height:120%!important }
                h3, h3 a { line-height:120%!important }
                h4, h4 a { line-height:120%!important }
                h5, h5 a { line-height:120%!important }
                h6, h6 a { line-height:120%!important }
                .z p { }
                .y p { }
                h1 { font-size:30px!important; text-align:left }
                h2 { font-size:24px!important; text-align:left }
                h3 { font-size:20px!important; text-align:left }
                h4 { font-size:24px!important; text-align:left }
                h5 { font-size:20px!important; text-align:left }
                h6 { font-size:16px!important; text-align:left }
                .b td a { font-size:12px!important }
                .ba p, .ba a { font-size:14px!important }
                .z p, .z a { font-size:14px!important }
                .y p, .y a { font-size:12px!important }
                .u, .u h1, .u h2, .u h3, .u h4, .u h5, .u h6 { text-align:center!important }
                .t img, .u img, .v img { display:inline!important }
                .t .rollover:hover .rollover-second, .u .rollover:hover .rollover-second, .v .rollover:hover .rollover-second { display:inline!important }
                a.n, button.n { font-size:18px!important; padding:10px 20px 10px 20px!important; line-height:120%!important }
                a.n, button.n, .r { display:inline-block!important }
                .m, .m .n, .o, .o td, .b { display:inline-block!important }
                .j table, .k, .l { width:100%!important }
                .g table, .h table, .i table, .g, .i, .h { width:100%!important; max-width:600px!important }
                .adapt-img { width:100%!important; height:auto!important }
                .e, .f { display:none!important }
                .b td { width:1%!important }
                table.a, .esd-block-html table { width:auto!important }
                .h-auto { height:auto!important }
            }
            @media screen and (max-width:384px) {
                .mail-message-content { width:414px!important }
            }
        </style>
        <style>
            * {
                scrollbar-width: thin;
                scrollbar-color: #888 transparent;
            }
            /* Chrome, Edge, Safari */
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            ::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 6px;
                border: 2px solid transparent;
            }
            ::-webkit-scrollbar-thumb:hover {
                box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            }
            textarea::-webkit-scrollbar-track {
                margin: 15px;
            }
        </style>
    </head>
    <body class="body" style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div dir="ltr" class="es-wrapper-color" lang="und" style="background-color:#FFFFFF">
        <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FFFFFF">
            <tbody>
            <tr>
                <td valign="top" style="padding:0;Margin:0">
                    <table cellpadding="0" cellspacing="0" align="center" class="h" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tbody>
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="ba" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:550px">
                                    <tbody>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
                                            <table cellpadding="0" cellspacing="0" align="right" class="l" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tbody>
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:335px">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tbody>
                                                            <tr class="e">
                                                                <td align="center" height="20" style="padding:0;Margin:0"></td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table cellspacing="0" cellpadding="0" align="center" class="g" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                        <tbody>
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table cellspacing="0" cellpadding="0" bgcolor="#DAEAFC" align="center" class="z" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:550px" role="none">
                                    <tbody>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0">
                                            <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tbody>
                                                <tr>
                                                    <td valign="top" align="center" class="be" style="padding:0;Margin:0;width:550px">
                                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tbody>
                                                            <tr>
                                                                <td align="center" style="padding:0;Margin:0;font-size:0px">
                                                                    <a target="_blank" href="https://viewstripo.email" style="mso-line-height-rule:exactly;text-decoration:underline;color:#1F4656;font-size:14px">
                                                                        <img src="https://tlr.stripocdn.email/content/guids/CABINET_f5d77df48a61d8cb8504acda7c48bef1ed36b9917dceb181827551d81a97ea4b/images/objects_mH8.png" alt="Carbon Emission & Tree Offset Report" width="550" title="Carbon Emission & Tree Offset Report" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" align="center" class="g" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                        <tbody>
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table bgcolor="#DAEAFC" align="center" cellpadding="0" cellspacing="0" class="z" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#DAEAFC;width:550px">
                                    <tbody>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tbody>
                                                <tr>
                                                    <td align="center" valign="top" style="padding:0;Margin:0;width:510px">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tbody>
                                                            <tr>
                                                                <td align="center" style="padding:0;Margin:0">
                                                                    <span class="r msohide" style="border-style:solid;border-color:#2CB543;background:#ef9a9e;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all">
                                                                        <a href="#" target="_blank" class="n n-1680271829351" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:5px 15px;display:inline-block;background:#ef9a9e;border-radius:30px;font-family:Manrope, Arial, sans-serif;font-weight:normal;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #ef9a9e">CARBON & OFFSET REPORT</a>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-bottom:20px">
                                                                    <h3 class="u" style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:50px;font-style:normal;font-weight:normal;line-height:66px;color:#1F4656">Your Carbon Emission & Tree Offset Report</h3>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" class="be bc" style="padding:0;Margin:0;padding-right:35px;padding-bottom:25px;padding-left:35px">
                                                                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#1F4656;font-size:14px">Dear ${name},<br><br> This is your personalized carbon emission and tree offset report. Below you will find details about your estimated annual carbon emissions, tree offset requirements, how your emission compares to the global average and ideal sustainable levels, and some recommendations for reducing your carbon footprint.</p>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:20px;Margin:0">
                                            <table cellpadding="0" cellspacing="0" align="left" class="k" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                <tbody>
                                                <tr>
                                                    <td align="left" class="bd" style="padding:0;Margin:0;width:245px">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tbody>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#1F4656;font-size:14px">Annual Emission</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                                                                    <table border="0" width="20%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tbody>
                                                                        <tr>
                                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #ef9a9e;background:unset;height:0px;width:100%;margin:0px"></td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                                                    <h3 style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:normal;line-height:26.4px;color:#1F4656">${annualEmissionTonnes.toFixed(2)} Tonnes</h3>
                                                                </td>
                                                            </tr>
                                                             <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#1F4656;font-size:14px">Trees to Offset</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                                                                    <table border="0" width="20%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tbody>
                                                                        <tr>
                                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #ef9a9e;background:unset;height:0px;width:100%;margin:0px"></td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                                                    <h3 style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:normal;line-height:26.4px;color:#1F4656">${treesToOffset} Trees</h3>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" align="right" class="l" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                                <tbody>
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:245px">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tbody>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#1F4656;font-size:14px">Global Average Emission</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                                                                    <table border="0" width="20%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tbody>
                                                                        <tr>
                                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #ef9a9e;background:unset;height:0px;width:100%;margin:0px"></td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                                                    <h3 style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:normal;line-height:26.4px;color:#1F4656">${averageEmission.toFixed(2)} Tonnes</h3>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <p style="Margin:0;mso-line-height-rule:exactly;font-family:Manrope, Arial, sans-serif;line-height:21px;letter-spacing:0;color:#1F4656;font-size:14px">Effort Rating</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0">
                                                                    <table border="0" width="20%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tbody>
                                                                        <tr>
                                                                            <td style="padding:0;Margin:0;border-bottom:1px solid #ef9a9e;background:unset;height:0px;width:100%;margin:0px"></td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                                                                    <h3 style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:22px;font-style:normal;font-weight:normal;line-height:26.4px;color:#1F4656">${starRating}</h3>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:40px">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tbody>
                                                <tr>
                                                    <td align="center" valign="top" style="padding:0;Margin:0;width:510px">
                                                        <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tbody>
                                                            <tr>
                                                                <td align="left" style="padding:0;Margin:0">
                                                                    <h2 style="Margin:0;font-family:Imprima, Arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:30px;font-style:normal;font-weight:normal;line-height:36px;color:#1F4656">Recommendations to Reduce Your Footprint:</h2>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" class="esdev-adapt-off" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:30px">
                                        <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:510px">
                                            <tbody>
                                            ${recommendationListHtml}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" align="center" class="g" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                    <tbody>
                    <tr>
                        <td align="center" style="padding:0;Margin:0">
                            <table align="center" cellpadding="0" cellspacing="0" class="z" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:550px" role="none">
                                <tbody>
                                <tr>
                                    <td align="left" style="padding:0;Margin:0">
                                        <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                            <tbody>
                                            <tr>
                                                <td align="center" valign="top" style="padding:0;Margin:0;width:550px">
                                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;font-size:0px">
                                                                <img src="https://tlr.stripocdn.email/content/guids/CABINET_f5d77df48a61d8cb8504acda7c48bef1ed36b9917dceb181827551d81a97ea4b/images/rectangle_226_Jm4.png" alt="" width="550" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table cellpadding="0" cellspacing="0" align="center" class="i" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                    <tbody>
                    <tr>
                        <td align="center" style="padding:0;Margin:0">
                            <table align="center" cellpadding="0" cellspacing="0" bgcolor="#00000000" class="y" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:550px">
                                <tbody>
                                <tr>
                                    <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:30px;padding-bottom:30px">
                                        <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                            <tbody>
                                            <tr>
                                                <td align="left" style="padding:0;Margin:0;width:510px">
                                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0">
                                                                <table cellpadding="0" cellspacing="0" class="a o" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px">
                                                                            <a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#1F4656;font-size:12px">
                                                                                <img title="Facebook" src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-colored/facebook-rounded-colored.png" alt="Fb" width="24" height="24" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                                            </a>
                                                                        </td>
                                                                        <td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px">
                                                                            <a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#1F4656;font-size:12px">
                                                                                <img title="Instagram" src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-colored/instagram-rounded-colored.png"                                                                                   instagram-rounded-colored.png" alt="Inst" width="24" height="24" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                                            </a>
                                                                        </td>
                                                                        <td align="center" valign="top" style="padding:0;Margin:0;padding-right:30px">
                                                                            <a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#1F4656;font-size:12px">
                                                                                <img title="Youtube" src="https://tlr.stripocdn.email/content/assets/img/social-icons/rounded-colored/youtube-rounded-colored.png" alt="Yt" width="24" height="24" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                                            </a>
                                                                        </td>
                                                                        <td align="center" valign="top" width="null" style="padding:0;Margin:0">
                                                                            <a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#1F4656;font-size:12px">
                                                                                <img title="X.com" src="https://localfiles.stripocdn.email/content/assets/img/social-icons/rounded-colored/x-rounded-colored.png" alt="X" width="24" height="24" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
    </div>
    </body>
    </html>`;
};