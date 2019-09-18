import React, { Component } from 'react'
import User from '../interfaces/User.interface'

interface SearchState {
	err: boolean,
	pokemon: Pokemon
}

interface Pokemon {
	name: string,
	numberOfAbilities: number,
	baseExperience: number,
	imageUrl: string
}

export class PokemonSearch extends Component<User, SearchState> {
	pokemonRef: React.RefObject<HTMLInputElement>
	constructor(props: User) {
		super(props);
		this.state = {
			pokemon: null,
			err: false
		}
		this.pokemonRef = React.createRef()
	}

	onSearchClick = ():void => {
		const inputValue = this.pokemonRef.current.value
		fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
			.then(res => {
				if(res.status !== 200) {
					this.setState({err: true})
				}
				res.json().then(data => {
					this.setState({
						pokemon: {
							name: data.name,
							numberOfAbilities: data.abilities.length,
							baseExperience: data.base_experience,
							imageUrl: data.sprites.front_default,
						},
						err: false
					})
				})
			})
	}

	addNumber = (a: number, b:number):number => {
		// this is a test function
		return a + b
	}

	render() {
		const { name: Username, numberOfPokemons } = this.props
		const { err, pokemon } = this.state
		let resultMarkup
		if (err) {
			resultMarkup = <p>Pokemon not found. Please try again</p>
		} else if (pokemon) {
			resultMarkup = <div>
				<img src={pokemon.imageUrl} alt='pokemon' className='pokemon-image' />
				<p>
					{pokemon.name} has {pokemon.numberOfAbilities} and {pokemon.baseExperience} experience points
				</p>
			</div>
		}
		return (
			<div>
				<p>User {Username} {' '}
				{numberOfPokemons && <span>{numberOfPokemons} pokemons</span>} </p>
				<input type='text' ref={this.pokemonRef} />
				<button onClick={this.onSearchClick} className='my-button' >
					Search
				</button>
				{resultMarkup}
			</div>
		)
	}
}

export default PokemonSearch
