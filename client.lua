local isDisplaying = false
local lastStreetName = ""

Citizen.CreateThread(function()
    while true do
        local playerPed = PlayerPedId()
        
        if IsPedInAnyVehicle(playerPed, false) then
            Citizen.Wait(cfg.rfstimes.vehicle)
        else
            Citizen.Wait(cfg.rfstimes.ped)
        end
        
        if IsPedInAnyVehicle(playerPed, false) or true then
            local coords = GetEntityCoords(playerPed)
            local street1, street2 = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
            local streetName = GetStreetNameFromHashKey(street1)
            local crossingName = GetStreetNameFromHashKey(street2)
            
            local fullStreetName = streetName
            if crossingName ~= nil and crossingName ~= "" then
                fullStreetName = streetName .. " - " .. crossingName
            end
            
            local isPaused = IsPauseMenuActive()

            if isPaused then
                if isDisplaying then
                    SendNUIMessage({
                        type = "hide"
                    })
                    isDisplaying = false
                end
            else
                if fullStreetName ~= lastStreetName then
                    SendNUIMessage({
                        type = "show",
                        street = fullStreetName,
                        theme = cfg.theme,
                        position = cfg.position,
                        mapicon = cfg.mapicon
                    })
                    isDisplaying = true
                    lastStreetName = fullStreetName
                else
                    if isDisplaying then
                        SendNUIMessage({
                            type = "hide"
                        })
                        isDisplaying = false
                    end
                end
            end
        end
    end
end)
