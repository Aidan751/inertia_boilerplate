

<div>
    @if (session()->has('message'))
        <div class="alert alert-success">
          {{ session('message') }}
        </div>
    @endif
    <form>
            <h4>Opening Times</h4>
            </br>
            <label class="control-label">Monday</label>   
      
                @foreach ($monday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="monday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="monday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(1,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(1, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Tuesday</label>   
      
                @foreach ($tuesday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="tuesday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="tuesday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(2,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(2, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Wednesday</label>   
      
                @foreach ($wednesday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="wednesday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="wednesday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(3,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(3, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Thursday</label>   
      
                @foreach ($thursday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="thursday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="thursday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(4,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(4, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Friday</label>   
      
                @foreach ($friday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="friday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="friday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn btn-primary btn-sm"wire:click.prevent="add(5,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(5, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Saturday</label>   
      
                @foreach ($saturday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="saturday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="saturday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(6,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(6, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Sunday</label>   
      
                @foreach ($sunday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="sunday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="sunday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(7,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(7, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <hr>

                <h4>Collection Times</h4>
        
            <div class="checkbox">
                <label><input type="checkbox" value="1" name="notify" wire:model="checkboxSelect"> Autofill slots from Opening Times above</label>
            </div>
      
            <label class="control-label">Monday</label>   
      
                @foreach ($collectionMonday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionMonday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionMonday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(8,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(8, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Tuesday</label>   
      
                @foreach ($collectionTuesday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionTuesday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionTuesday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(9,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(9, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Wednesday</label>   
      
                @foreach ($collectionWednesday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionWednesday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionWednesday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(10,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(10, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Thursday</label>   
      
                @foreach ($collectionThursday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionThursday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionThursday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(11,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(11, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Friday</label>   
      
                @foreach ($collectionFriday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionFriday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionFriday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(12,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(12, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Saturday</label>   
      
                @foreach ($collectionSaturday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionSaturday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionSaturday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(13,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(13, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach

                <label class="control-label">Sunday</label>   
      
                @foreach ($collectionSunday as $key => $value)

                    <div class=" add-input">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" placeholder="From" wire:model="collectionSunday.{{ $key }}.from" >
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <input type="time" class="form-control" wire:model="collectionSunday.{{ $key }}.to" placeholder="To">
                                </div>
                            </div>
                            @if ($key == 0)
                            <div class="col-md-2">
                                <button class="btn text-white btn-primary btn-sm"wire:click.prevent="add(14,{{$key}})" >Add</button>
                            </div>
                            @else
                            <div class="col-md-2">
                                <button class="btn btn-danger btn-sm" wire:click.prevent="remove(14, {{$key}})">remove</button>
                            </div>
                            @endif
                        </div>
                    </div>
                @endforeach
          

    
        <div class="row">
            <div class="col-md-12">
                <button type="button" wire:click.prevent="store()" class="btn btn-success">Update</button>
            </div>

    </form>
</div>