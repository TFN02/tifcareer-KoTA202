<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['string', 'max:100'],
            'job_posistion' => ['string', 'max:255'],
            'location' => ['string', 'max:150'],
            'salary' => ['double'],
            'status' => ['string', 'max:100'],
        ];
    }
}
