import { default as ReactSelect } from "react-select";
import Option from "./MultiSelectOption";

const MultiSelectDropdown = (props) => { 

	const {options, handleSelectChange, defaultValue, isMulti, className, handleSelectClose } = props;

		return (
			<div className="multiSelectDropDown" >
				<span
					className="d-inline-block"
					data-toggle="popover"
					data-trigger="focus"
					data-content=""
				>
				<ReactSelect
					options={options}
					isMulti={isMulti}
					closeMenuOnSelect={false}
					hideSelectedOptions={true}
					components={{
						Option
					}}
					onChange={handleSelectChange}
					allowSelectAll={true}
					defaultValue={defaultValue}
					key={defaultValue}
					classNamePrefix={className}
				/>
				</span>
			</div>
		)
}

export default MultiSelectDropdown;