<?php
$ID = $_GET["ID"];
echo "<?xml version='1.0' encoding='UTF-8' standalone='yes'?>
<StyledLayerDescriptor version='1.0.0' 
                       xmlns='http://www.opengis.net/sld' 
                       xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
                       xsi:schemaLocation='http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd'>
    
    <!-- 
    SLD spec documentation: http://portal.opengeospatial.org/files/?artifact_id=22364
    Howto SLD user guide: http://wiki.deegree.org/deegreeWiki/HowToUseWMSGetMapRequestsWithSLD
    -->
    
    <NamedLayer>
        <Name>geoinfo:worldadm</Name>
        <UserStyle>
            <Name>selector</Name>
            <FeatureTypeStyle>              
                <Rule>
                    <Filter xmlns='http://www.opengis.net/ogc'>                      
                        <PropertyIsEqualTo>
                            <PropertyName>GMI_CNTRY</PropertyName>
                            <Literal>$ID</Literal>
                        </PropertyIsEqualTo>
                    </Filter>
                    <PolygonSymbolizer>
                        <Fill>
                            <CssParameter name='fill'>#0088AA</CssParameter>
                            <CssParameter name='fill-opacity'>1.0</CssParameter>
                        </Fill>
                        <Stroke>
                            <CssParameter name='stroke'>#000000</CssParameter>
                            <CssParameter name='stroke-width'>1</CssParameter>
                        </Stroke>
                    </PolygonSymbolizer>
                </Rule>
                <Rule>
                    <ElseFilter/>
                    <PolygonSymbolizer>
                        <Fill>
                            <CssParameter name='fill'>#AAAAAA</CssParameter>
                            <CssParameter name='fill-opacity'>1.0</CssParameter>
                        </Fill>
                        <Stroke>
                            <CssParameter name='stroke'>#000000</CssParameter>
                            <CssParameter name='stroke-width'>1</CssParameter>
                        </Stroke>
                    </PolygonSymbolizer>
                </Rule>                
            </FeatureTypeStyle>
        </UserStyle>
    </NamedLayer>
</StyledLayerDescriptor>";
?>