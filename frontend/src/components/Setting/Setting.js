import React from 'react'
import { Box, Button, Card, Divider, Icon, InlineStack, Page, Text } from '@shopify/polaris';
import { ProfileIcon } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';
import Myprofile from '../../containers/Myprofile/Myprofile';
import { useLocation } from 'react-router'

function Setting() {
  const navigate = useNavigate();
  const location = useLocation();

  const organizationList = [
    {
      key: 1,
      label: 'Profile',
      description: `Delete account, change password`,
      image: ProfileIcon,
      url: '/setting/myprofile',
      ctaName: 'Update',
    },
  ]

  const handleRedirectShp = (path) => {
    navigate(path);
  }

  let searchPath = '';
  // get the path name (Remove / and .split() => convert a string into an array)
  let pathName = location.pathname.split('/');
  if (pathName) {
    searchPath = pathName.length > 2 ? pathName[2] : '';
  }

  return (
    <div>
      {
        searchPath === 'myprofile' ?
          <Myprofile isShwBack={true} />
          :
          <Page
            title={'Settings'}
            subtitle={'Manage settings that apply to your organization.'}
          >
            <Card padding={0}>
              <Box paddingBlock={300} paddingInline={400} background="bg-surface-secondary">
                <Text variant='headingMd' fontWeight='semibold' as='h1'>Organization settings</Text>
              </Box>

              <Divider borderColor='border-tertiary' />
              <Box paddingInline={400} paddingBlockEnd={200}>
                {organizationList && organizationList.map((data, i) => {
                  return (
                    <div id='cursorPoint' key={i} onClick={() => handleRedirectShp(data.url)} style={{ textDecoration: 'none' }}>
                      <InlineStack align='space-between' blockAlign='center'>
                        <Box paddingBlockStart={400} paddingBlockEnd={i !== organizationList.length - 1 ? 400 : 200} padding={{ xs: 0, sm: 0, md: 0 }}>
                          <InlineStack wrap={false} blockAlign='center' gap={300}>
                            <Box>
                              <Icon source={data.image} tone='base' />
                            </Box>
                            <Box>
                              <Text variant='headingXs' as='h6' fontWeight='semibold'>{data.label ? data.label : '-'}</Text>
                              <Box paddingBlockStart={100}>
                                <Text variant='headingXs' as='p' fontWeight='regular' tone='subdued'>{data.description ? data.description : '-'}</Text>
                              </Box>
                            </Box>
                          </InlineStack>
                        </Box>
                        <Box className="Polaris-Box Organization-Box-Rightitem">
                          <Button>{data.ctaName}</Button>
                        </Box>
                      </InlineStack>
                      {i !== organizationList.length - 1 && <Divider />}
                    </div>
                  )
                })}
              </Box>
            </Card>
          </Page>
      }
    </div>
  )
}
export default Setting;