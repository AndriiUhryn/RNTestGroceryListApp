import React from 'react';
import styled from 'styled-components/native';
import { ms, vs } from 'react-native-size-matters';
import { defineMessages, useIntl } from 'react-intl';

import { StatusBar, Header, StyledComponents } from '../../components';

const messages = defineMessages({
    title: {
        id: 'workInProgress.title',
        defaultMessage: 'Work in',
    },
    title1: {
        id: 'workInProgress.title1',
        defaultMessage: 'Progress',
    },
    subTitle: {
        id: 'workInProgress.subTitle',
        defaultMessage: 'Thank you for understanding',
    },
    header: {
        id: 'workInProgress.header',
        defaultMessage: 'Progress',
    },
});

export const WorkInProgress = () => {
    const { formatMessage } = useIntl();

    return (
        <StyledComponents.Container>
            <StatusBar />
            <Header
                showBack
                center={{
                    title: formatMessage(messages.header)
                }}
                bgColor="transparent"
            />
            <StyledComponents.ContentCenter style={{paddingBottom: vs(65)}}>
                <TitleWrapper>
                    <Title
                        color="white"
                    >
                        {formatMessage(messages.title)}
                    </Title>
                    <Title
                        bold
                        color="yellow"
                    >
                        {formatMessage(messages.title1)}
                    </Title>
                </TitleWrapper>
                <SubTitle>
                    {formatMessage(messages.subTitle)}
                </SubTitle>
            </StyledComponents.ContentCenter>
        </StyledComponents.Container>
    );
};

export default WorkInProgress;

const Title = styled.Text`
    color: ${props => props.theme.colors.text[props.color]};
    font-size: ${ms(28)}px;
    font-family: ${props => props.theme.fonts[props.bold ? 'bold' : 'light']};
`;

const SubTitle = styled.Text`
    color: ${props => props.theme.colors.text.grey};
    font-size: ${ms(14)}px;
    margin-top: ${vs(13)}px;
    font-family: ${props => props.theme.fonts.light};
`;

const TitleWrapper = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;
