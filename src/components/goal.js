/** @format */

import React from "react";
import GoalStyledDiv from "./../styles/goalStyles";
import StyledCheckbox from "./../styles/StyledCheckbox";
import StylesGoalDetails from "./../styles/StylesGoalDetails";

export default function goal({ goal, updates }) {
	return (
		<GoalStyledDiv>
			<StyledCheckbox>
				{" "}
				<input type="checkbox" defaultChecked={goal.Completed} disabled />
				<span />
			</StyledCheckbox>

			<h2>{goal.Title}</h2>
			<StylesGoalDetails>
				<h3>Details</h3>
				<p>{goal.Details}</p>
				<h3>Updates</h3>
				{updates.map((update, i) => (
					<p key={i}>{update.fields.Update}</p>
				))}
			</StylesGoalDetails>
		</GoalStyledDiv>
	);
}
