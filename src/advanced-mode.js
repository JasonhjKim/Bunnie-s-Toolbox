import React, { Component } from 'react';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import AdvancedItem from './advanced-item';
import { Link } from 'react-router-dom'

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
`

const Container = styled.div`
    width: 1024px;
    /* border: 1px solid black; */
    height: 850px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-y: hidden;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    color: #64B9CC;
    font-size: 24px;
    font-weight: bold;
    margin: 1em 0 1em 0;
`

const SubmitButton = styled.input`
    width: 343px;
    height: 58px;
    color: white;
    background-color: #6485CC;
    font-size: 24px;
    font-weight: bold;
    border-radius: 8px;
    align-self: center;
    margin: 1em;
`

const TextArea = styled.textarea`
    width: 400px;
    height: 650px;
    border-radius: 4px;
`

const ResultArea = styled.div`
    width: 625px;
    max-height: 850px;
    display: flex;
    flex-direction: column;
    /* border: 1px solid black; */
    margin-left: 1em;
    overflow-y: scroll;
`

const Items = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export default class AdvancedMode extends Component {
    state = {
        itemList: [],
        links: "",
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target[0].value)
        this.parseData(e.target[0].value)
    }


    parseData(raw) {
        const firstIndex = raw.indexOf("window.pageData=") + 16;
        const lastIndex = raw.indexOf("}</script>") + 1;
        console.log("first: ", firstIndex, raw[firstIndex + 16]);
        console.log("last: ", lastIndex, raw[lastIndex]);

        const rawJson = raw.substring(firstIndex, lastIndex);
        // console.log(rawJson);

        const json = JSON.parse(rawJson);
        console.log(json);
        const itemList = json.mods.listItems
        console.log(itemList);

        let stringBuilder = "";
        for (let i = 0; i < itemList.length; i++) {
            let current = itemList[i].productUrl
            current = "https:" + current;
            itemList[i].productUrl = current;
            stringBuilder = stringBuilder + current + "\n";
        }

        this.setState({ itemList, links: stringBuilder });
    }

    handleOnClick(e) {
        console.log(e.target[0]);
    }

    render() {
        return(
            <Body>
                <NavBar/>
                <Container>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Label>View Source Lazada Here: </Label>
                        <TextArea name="" id="" cols="30" rows="10" required></TextArea>
                        <SubmitButton type="submit" value="Hit it" />
                    </Form>
                    { this.state.itemList.length > 0 &&
                        <ResultArea>
                            <Label>Advanced Result: </Label>
                            { this.state.itemList.map((item) => 
                                <AdvancedItem productUrl={item.productUrl} name={item.name} image={item.image} priceShow={item.priceShow}/>
                            )}
                        </ResultArea>

                    }
                </Container>
            </Body>
        )
    }
}

const NavBarContainer = styled.div`
    width: 100%;
    height: 75px;
    background-color: #64B9CC;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

const LogoHeading = styled.div`
    font-size: 28px;
    color: white;
    /* margin-left: 150px; */
    font-weight: bold;
`


const Simple = styled.button`
    color: white;
    background-color: #cc7764;
    width: 150px;
    height: 40px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 14px;
    text-decoration: none;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const NavBar = () => {
    return(
        <NavBarContainer>
            <LogoHeading>Bunnie's Tool Box</LogoHeading>
            <Simple><StyledLink to="/">Simple Mode</StyledLink></Simple>
        </NavBarContainer>
    )
}